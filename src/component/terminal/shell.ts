import {Directory} from '../../model/device/directory';
import {File} from '../../model/device/file';

declare var Josh: any;
declare var _: any;

export class Shell{
    private _id: number;
    private _rootDirectory: Directory;

    private joshShell: any;
    private joshPathHandler: any;

    private templates: any;

    private _onOpenFile: (file: File) => void;

	constructor(id: number) {
		this._id = id;
        this.init();
        this.templates = {};
        this.templates.not_found = _.template("<div><%=cmd%>: <%=path%>: No such file or directory</div>");
        this.templates.is_a_directory = _.template("<div><%=cmd%>: <%=path%> is a directory</div>");
	}

    private init(): void{
        var id: number = this._id;
        this.joshShell = Josh.Shell({'shell_panel_id': 'shell-panel' + id, 'shell_view_id': 'shell-view' + id, 'input_id': 'shell-cli' + id});
        var promptCounter = 0;
        this.joshShell.onNewPrompt(function(callback) {
            promptCounter++;
            callback("[" + promptCounter + "] $");
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
        this.joshShell.setCommandHandler("open", {
            exec: (cmd, args, callback) => {
                this.joshPathHandler.getNode(args[0], (node) => {
                    if(!node) {
                        return callback(this.templates.not_found({cmd: 'open', path: args[0]}));
                    }
                    this.joshPathHandler.isDirectory(node, (isDirectory) => {
                        if(!isDirectory){
                            this._onOpenFile(node);
                            return callback();
                        }else{
                            return callback(this.templates.is_a_directory({cmd: 'open', path: args[0]}));
                        }
                    });
                });
            },
            completion: this.joshPathHandler.pathCompletionHandler
        });
    }

    public addCommandHandler(alias: string, handler: (cmd: string, args: string[], callback: any) => void): void{
        this.joshShell.setCommandHandler(alias, {
            exec: handler
        });
    }

    public addPathCommandHandler(alias: string, handler: (cmd: string, args: string[], callback: any) => void): void{
        this.joshShell.setCommandHandler(alias, {
            exec: handler,
            completion: this.joshPathHandler.pathCompletionHandler
        })
    }

    public activate(): void{
        this.joshShell.activate();
    }

    public onChangeDirectory(callback: (directory: Directory) => void): void{
        this.joshPathHandler.onChangeDirectory = callback;
    }

    public onOpenFile(callback: (file: File) => void): void{
        this._onOpenFile = callback;
    }

	public set rootDirectory(value: Directory) {
		this._rootDirectory = value;
        this.joshPathHandler.current = this._rootDirectory;
	}
    
}