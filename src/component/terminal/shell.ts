export class Shell{
    private _id: number;
    private _onChange: () => void;

	constructor(id: number) {
		this._id = id;
	}

	public get id(): number {
		return this._id;
	}
    
    public activate(): void{
        if(this._onChange){
            this._onChange();
        }
    }

    public onChange(onChange: () => void): void{
        this._onChange = onChange;
    }
}