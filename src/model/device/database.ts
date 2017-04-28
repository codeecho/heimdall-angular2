import {File} from './file';
import {Directory} from './directory';
import {DatabaseRecord} from './database_record';

export class Database extends Directory{

	private _fields: string[];
	private _filteredRecords: DatabaseRecord[];

	constructor(name: string, fields: string[], parent: Directory) {
		super(name, parent);
		this._fields = fields;
	}

	public get fields(): string[] {
		return this._fields;
	}

	public get filteredRecords(): DatabaseRecord[] {
		return this._filteredRecords;
	}

	public filter(filterString: string): void{
		var records = <DatabaseRecord[]>this.children;
		var regex = new RegExp(".*" + filterString + ".*", "i");
		this._filteredRecords = records.filter(record => {
			var match = record.fields.find(field => regex.test(field));
			return match != undefined;
		});
	}	

}