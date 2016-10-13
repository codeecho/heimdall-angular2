import {File} from './file';
import {Directory} from './directory';

export class TextFile extends File{

    private _content: string;

	constructor(name: string, content: string, parent?: Directory) {
		super(name, parent);
        this._content = content;
	}

	public get content(): string {
		return this._content;
	}
    
}