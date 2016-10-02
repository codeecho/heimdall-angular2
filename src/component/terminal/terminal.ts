import {Shell} from './shell';

declare var activateTerminal: any;

export class Terminal{
    private _shell: Shell;

    private _isOpen: boolean;

    command: string;
    
    constructor(shell: Shell){
        this._shell = shell;
        this._isOpen = false;
    }
    
    open(): void{
        this._isOpen = true;
        this.activate();
    }
    
    close(): void{
        this._isOpen = false;
    }

    activate(): void{
        this._shell.activate();
    }

	get isOpen(): boolean {
		return this._isOpen;
    }

	public get shell(): Shell {
		return this._shell;
	}

}