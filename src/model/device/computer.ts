import {Device} from './device';
import {Directory} from './directory';
import {Location} from '../location';

export class Computer extends Device{

	constructor(name: string, rootDirectory: Directory, location: Location) {
		super(name, rootDirectory, location);
	}
    
}