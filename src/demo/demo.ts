import {Computer} from '../model/device/computer';
import {Directory} from '../model/device/directory';

export class Demo{
    private _homeComputer: Computer;
    
	constructor() {
        var rootDirectory: Directory = new Directory('root');
		this._homeComputer = new Computer('localhost', rootDirectory);
	}

	public get homeComputer(): Computer {
		return this._homeComputer;
	}

}