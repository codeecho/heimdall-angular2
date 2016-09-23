module.exports = function(grunt) {

  var merge = require("merge");

  var includes = ["**/*", "!**/*.jade", "!**/*.ts"];

  var config = {
    pkg: grunt.file.readJSON("package.json"),
    clean: ["build", "app/*", "dist"],
    copy: {
      stage: {
        files: [{
          expand: true,
          cwd: "src",
          src: ["**/*"],
          dest: "build/stage"
        }]
      },
      publish: {
        files: [{
          expand: true,
          cwd: "build/stage",
          src: includes,
          dest: "app"
        }]
      },
    }
  }

  merge(config, {
    express: {
      all: {
        options: {
          port: 9000,
          bases: ["app", "node_modules"],
          livereload: true
        }
      }
    },
    open: {
      all: {
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },
    watch: {
      all: {
        files: ['src/**/*', 'bower_components/**/*'],
        tasks: ['copy:stage', "do-setup", "do-validate", "do-build", "copy:publish"]
      },
      nots:{
        files: ['src/**/*', 'bower_components/**/*', "!src/**/*.ts"],
        tasks: ['copy:stage', "do-setup", "do-validate", "do-build-without-ts", "copy:publish"]
      }
    }
  });
  merge(config, {
    pug: {
      html: {
        files: [{
          cwd: "build/stage",
          src: "**/*.jade",
          dest: "build/stage",
          expand: true,
          ext: ".html"
        }],
        options: {
          client: false
        }
      }
    }
  });
  merge(config, {
    ts: {
      default: {
        tsconfig: true
      }
    }
  })
  merge(config, {
      includes: {
        files: {
          src: ['**/*.js'], // Source files
          dest: 'build/stage',
          cwd: 'build/stage',
          options: {
            silent: true,
            includePath: ['.']
          }
        }
      }
    })
    //<humphrey:config:insert>//

  grunt.initConfig(config);

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("do-serve-without-ts", ["build", "express", "open", "watch:nots"]);
  grunt.registerTask("do-serve", ["build", "express", "open", "watch:all"]);
  grunt.registerTask("do-pug", ["pug"]);
  grunt.registerTask("do-ts", ["ts"]);
  grunt.registerTask("do-includes", ["includes"]);
  //<humphrey:subtask:insert>//

  grunt.registerTask("do-setup", []);
  grunt.registerTask("do-validate", []);
  grunt.registerTask("do-build-without-ts", ["do-pug", "do-includes"]);
  grunt.registerTask("do-build", ["do-build-without-ts", "do-ts"]);
  grunt.registerTask("do-test", []);
  grunt.registerTask("do-package", []);
  grunt.registerTask("do-archive", []);
  grunt.registerTask("do-deploy", []);

  grunt.registerTask("setup", ["clean", "copy:stage", "do-setup"]);
  grunt.registerTask("validate", ["setup", "do-validate"]);
  grunt.registerTask("build", ["validate", "do-build", "copy:publish"]);
  grunt.registerTask("build-without-ts", ["validate", "do-build-without-ts", "copy:publish"]);
  grunt.registerTask("test", ["build", "do-test"]);
  grunt.registerTask("package", ["test", "do-package"]);
  grunt.registerTask("archive", ["package", "do-archive"]);
  grunt.registerTask("deploy", ["archive", "do-deploy"]);

  grunt.registerTask("serve", ["do-serve"]);
  grunt.registerTask("serve-without-ts", ["do-serve-without-ts"]);
  //<humphrey:task:insert>//

  grunt.registerTask("default", ["test"]);

};