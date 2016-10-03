declare var Josh: any;

export class Shell{
    private _id: number;

    private joshShell: any;

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
    }

    public addCommandHandler(alias: string, handler: (cmd: string, args: string[], callback: any) => void): void{
        this.joshShell.setCommandHandler(alias, {
            exec: handler
        });
    }

    public activate(): void{
        this.joshShell.activate();
    }
    
}