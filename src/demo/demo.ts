import {Network} from '../model/network';
import {Computer} from '../model/device/computer';
import {Directory} from '../model/device/directory';
import {File} from '../model/device/file';
import {TextFile} from '../model/device/text_file';
import {Location} from '../model/location';
import {Coordinates} from '../model/coordinates';

export class Demo{
    private _network: Network;
    
	constructor() {
        this._network = this.createNetwork();
	}

	private createNetwork(): Network{
		var localhost = this.createLocalhost();
		var device1 = this.createDevice1();
		return new Network(localhost, [device1], []);
	}

	private createLocalhost(): Computer{
		var location = new Location(1, "1234", "Home", new Coordinates(100,100));
		var rootDirectory = new Directory('root');
		var dir1 = new Directory('dir1', rootDirectory);
		rootDirectory.addChild(dir1);
		var dir2 = new Directory('dir2', rootDirectory);
		rootDirectory.addChild(dir2);
		var file1 = new TextFile('file1.txt', 'This is a test', rootDirectory);
		rootDirectory.addChild(file1);
		var dir3 = new Directory('dir3', dir1);
		dir1.addChild(dir3);
		var file2 = new File("file2.txt", dir1);
		dir1.addChild(file2);
		var file3 = new File('file3.txt', dir2);
		dir2.addChild(file3);
		var localhost = new Computer('localhost', rootDirectory, location);
		return localhost;
	}

	private createDevice1(): Computer{
		var location = new Location(1, '1234', 'Test Location 1', new Coordinates(1, 1));
		var rootDirectory = new Directory('root');
		var dir1 = new Directory('td1', rootDirectory);
		rootDirectory.addChild(dir1);
		var dir2 = new Directory('td2', rootDirectory);
		rootDirectory.addChild(dir2);
		var file1 = new TextFile('test1.txt', 'This is a test', rootDirectory);
		rootDirectory.addChild(file1);
		var dir3 = new Directory('td3', dir1);
		dir1.addChild(dir3);
		var file2 = new File("tf2.txt", dir1);
		dir1.addChild(file2);
		var file3 = new File('tf3.txt', dir2);
		dir2.addChild(file3);
		return new Computer('device1', rootDirectory, location);
	}

	public get network(): Network {
		return this._network;
	}

}