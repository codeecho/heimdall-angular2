import {File} from './file';
import {Directory} from './directory';
import {Database} from './database';

export class DatabaseRecord extends File{

	private _fields: string[];
	private _file: File;

	constructor(name: string, fields: string[], file: File, parent: Database) {
		super(name, parent);
		this._fields = fields;
		this._file = file;
		file.parent = parent;
	}

	public get fields(): string[] {
		return this._fields;
	}

	public get file(): File {
		return this._file;
	}

}