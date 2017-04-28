import {DiskItem} from './disk_item';
import {Directory} from './directory';

export class MailBox extends Directory{

	constructor(name: string, parent?: Directory) {
		super(name, parent);
	}

}