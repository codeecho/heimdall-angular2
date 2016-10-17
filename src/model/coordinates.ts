export class Coordinates{
    private _longtitude: number;
    private _latitude: number;

	constructor(longtitude: number, latitude: number) {
		this._longtitude = longtitude;
		this._latitude = latitude;
	}

	public get longtitude(): number {
		return this._longtitude;
	}

	public get latitude(): number {
		return this._latitude;
	}
    
}