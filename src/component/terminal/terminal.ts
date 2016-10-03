import {Shell} from './shell';

declare var activateTerminal: any;

export class Terminal{
    private _id: number;
    private _onActivate: () => void;

    private _isOpen: boolean;

    command: string;
    
    constructor(id: number){
        this._id = id;
        this._isOpen = false;
    }
    
    open(): void{
        this._isOpen = true;
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

	get isOpen(): boolean {
		return this._isOpen;
    }

	public get id(): number {
		return this._id;
	}

}