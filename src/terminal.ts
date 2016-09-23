export class Terminal{
    private id: number;
    private _isOpen: boolean;
    
    constructor(id: number){
        this.id = id;
        this._isOpen = false;
    }
    
    open(): void{
        this._isOpen = true;
    }
    
    close(): void{
        this._isOpen = false;
    }

	get isOpen(): boolean {
		return this._isOpen;
	}

}