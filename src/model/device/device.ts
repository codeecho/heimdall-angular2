import {Directory} from './directory';
import {Location} from '../location';

export class Device{
    private _name: string;
	private _ipAddress: string;
    private _rootDirectory: Directory;
	private _location: Location;

	constructor(name: string, ipAddress: string, rootDirectory: Directory, location: Location) {
		this._name = name;
		this._ipAddress = ipAddress;
		this._rootDirectory = rootDirectory;
		this._location = location;
	}

	public get name(): string {
		return this._name;
	}

	public get ipAddress(): string {
		return this._ipAddress;
	}	

	public get rootDirectory(): Directory {
		return this._rootDirectory;
	}

	public get location(): Location {
		return this._location;
	}
    
}