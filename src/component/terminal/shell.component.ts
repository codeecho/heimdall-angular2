import { Component, Input, AfterViewInit, Inject, ElementRef, ViewChild} from '@angular/core';
import {Shell} from './shell';

declare var Josh: any;

@Component({
  selector: 'shell',
  templateUrl: 'component/terminal/shell.html'
})

export class ShellComponent extends AfterViewInit{ 
  @Input()
  shell: Shell;

  private joshShell: any;

	constructor() {
    super();
	}

  ngAfterViewInit(): void{
    var id: number = this.shell.id;
    this.joshShell = Josh.Shell({'shell_panel_id': 'shell-panel' + id, 'shell_view_id': 'shell-view' + id, 'input_id': 'shell-cli' + id});
    var promptCounter = 0;
    this.joshShell.onNewPrompt(function(callback) {
      promptCounter++;
      callback("[" + promptCounter + "] $");
    });
    this.joshShell.setCommandHandler("hello", {
      exec: function(cmd, args, callback) {
        var arg = args[0] || '';
        var response = "who is this " + arg + " you are talking to?";
        if(arg === 'josh') {
          response = 'pleased to meet you.';
        } else if(arg === 'world') {
          response = 'world says hi.'
        } else if(!arg) {
          response = 'who are you saying hello to?';
        }
        callback(response);
      },
      completion: function(cmd, arg, line, callback) {
        callback(this.joshShell.bestMatch(arg, ['world', 'josh']))
      }
    });
    this.shell.onChange(() => {
      this.joshShell.activate();
    })
  }

  activate(): void{
    this.shell.activate();
  }

}
