import {Directory} from './directory';

export class Device{
    private _name: string;
    private _rootDirectory: Directory;

	constructor(name: string, rootDirectory: Directory) {
		this._name = name;
		this._rootDirectory = rootDirectory;
	}

	public get name(): string {
		return this._name;
	}

	public get rootDirectory(): Directory {
		return this._rootDirectory;
	}
    
}