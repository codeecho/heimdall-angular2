import {DiskItem} from './disk_item';
import {Directory} from './directory';

export class File extends DiskItem{
    constructor(name: string, parent?: Directory) {
		super(name, parent);
	}
}