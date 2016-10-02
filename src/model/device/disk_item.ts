import {Directory} from './directory';

export class DiskItem{
    private _parent: Directory;
    private _name: string;

	constructor(name: string, parent?: Directory) {
		this._parent = parent;
		this._name = name;
	}

	public get parent(): Directory {
		return this._parent;
	}

	public set parent(value: Directory) {
		this._parent = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}
    
}