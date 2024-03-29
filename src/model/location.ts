import {Coordinates} from './coordinates';
import {Device} from './device/device';

export class Location{
    private _number: number;
	private _street: string;
    private _postalCode: string;
    private _description: string;
    private _coordinates: Coordinates;

	constructor(number: number, street: string, postalCode: string, description: string, coordinates: Coordinates) {
		this._number = number;
		this._street = street;
		this._postalCode = postalCode;
		this._description = description;
		this._coordinates = coordinates;
	}

	public get number(): number {
		return this._number;
	}

	public get street(): string {
		return this._street;
	}

	public get postalCode(): string {
		return this._postalCode;
	}

	public get description(): string {
		return this._description;
	}

	public get coordinates(): Coordinates {
		return this._coordinates;
	}
    
}