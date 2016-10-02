import {Device} from './device';
import {Directory} from './directory';

export class Computer extends Device{

	constructor(name: string, rootDirectory: Directory) {
		super(name, rootDirectory);
	}
    
}