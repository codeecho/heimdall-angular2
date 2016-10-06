import {Directory} from '../../model/device/directory';

declare var Josh: any;
declare var _: any;

export class Shell{
    private _id: number;
    private _rootDirectory: Directory;

    private joshShell: any;
    private joshPathHandler: any;

	constructor(id: number) {
		this._id = id;
        this.init();
	}

    private init(): void{
        var id: number = this._id;
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
        this.joshPathHandler = new Josh.PathHandler(this.joshShell);
        this.joshPathHandler.current = this._rootDirectory;
        this.joshPathHandler.getNode = (path: string, callback) => {
            if(!path) {
                return callback(this.joshPathHandler.current);
            }
            var parts = _.filter(path.split('/'), function(x) {
                return x;
            });
            var start = ((path || '')[0] == '/') ? this._rootDirectory : this.joshPathHandler.current;
            return findNode(start, parts, callback);
        };
        this.joshPathHandler.getChildNodes = (node, callback) => {
            callback(node.children);
        };
        this.joshPathHandler.isDirectory = (node, callback) => {
            callback(node instanceof Directory);
        }
        function findNode(current, parts, callback) {
            if(!parts || parts.length == 0) {
                return callback(current);
            }
            if(parts[0] == ".") {
            } else if(parts[0] == "..") {
                current = current.parent;
            } else {
                current = _.first(_.filter(current.children, function(node) {
                return node.name == parts[0];
                }));
            }
            if(!current) {
                return callback();
            }
            return findNode(current, _.rest(parts), callback);
        }
    }

    public addCommandHandler(alias: string, handler: (cmd: string, args: string[], callback: any) => void): void{
        this.joshShell.setCommandHandler(alias, {
            exec: handler
        });
    }

    public activate(): void{
        this.joshShell.activate();
    }

	public set rootDirectory(value: Directory) {
		this._rootDirectory = value;
        this.joshPathHandler.current = this._rootDirectory;
	}
    
}