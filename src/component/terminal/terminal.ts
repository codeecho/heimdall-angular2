import {Shell} from './shell';

declare var activateTerminal: any;

export class Terminal{
    private _id: number;
    private _onOpen: () => void;
    private _onActivate: () => void;

    private _isOpen: boolean;

    command: string;
    
    constructor(id: number){
        this._id = id;
        this._isOpen = false;
    }
    
    open(): void{
        this._isOpen = true;
        if(this._onOpen){
            this._onOpen();
        }
        this.activate();
    }
    
    close(): void{
        this._isOpen = false;
    }

    public activate(): void{
        if(this._onActivate){
            this._onActivate();
        }
    }

    public onActivate(_onActivate: () => void): void{
        this._onActivate = _onActivate;
    }

    public onOpen(_onOpen: () => void): void{
        this._onOpen = _onOpen;
    }

	get isOpen(): boolean {
		return this._isOpen;
    }

	public get id(): number {
		return this._id;
	}

}