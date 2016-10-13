import {Computer} from '../model/device/computer';
import {Directory} from '../model/device/directory';
import {File} from '../model/device/file';
import {TextFile} from '../model/device/text_file';

export class Demo{
    private _localhost: Computer;
    
	constructor() {
        var rootDirectory: Directory = new Directory('root');
		var dir1: Directory = new Directory('dir1', rootDirectory);
		rootDirectory.addChild(dir1);
		var dir2: Directory = new Directory('dir2', rootDirectory);
		rootDirectory.addChild(dir2);
		var file1: File = new TextFile('file1.txt', 'This is a test', rootDirectory);
		rootDirectory.addChild(file1);
		var dir3: Directory = new Directory('dir3', dir1);
		dir1.addChild(dir3);
		var file2: File = new File("file2.txt", dir1);
		dir1.addChild(file2);
		var file3: File = new File('file3.txt', dir2);
		dir2.addChild(file3);
		this._localhost = new Computer('localhost', rootDirectory);
	}

	public get localhost(): Computer {
		return this._localhost;
	}

}