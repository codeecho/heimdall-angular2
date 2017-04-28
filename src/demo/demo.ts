import {Network} from '../model/network';
import {Person} from '../model/person';
import {Computer} from '../model/device/computer';
import {Directory} from '../model/device/directory';
import {File} from '../model/device/file';
import {TextFile} from '../model/device/text_file';
import {MailBox} from '../model/device/mail_box';
import {Conversation} from '../model/device/conversation';
import {Message} from '../model/device/message';
import {Location} from '../model/location';
import {Coordinates} from '../model/coordinates';
import {Database} from '../model/device/database';
import {DatabaseRecord} from '../model/device/database_record';

export class Demo{
    private _network: Network;
    
	constructor() {
        this._network = this.createNetwork();
	}

	private createNetwork(): Network{
		var localhost = this.createLocalhost();
		var device1 = this.createDevice1();
		return new Network(localhost, [device1], [device1.location]);
	}

	private createLocalhost(): Computer{
		var location = new Location(1, "Test Street", "1234", "Home", new Coordinates(100,100));
		var rootDirectory = new Directory('root');
		var dir1 = new Directory('dir1', rootDirectory);
		rootDirectory.addChild(dir1);
		var dir2 = new Directory('dir2', rootDirectory);
		rootDirectory.addChild(dir2);
		var file1 = new TextFile('file1.txt', 'This is a test', rootDirectory);
		rootDirectory.addChild(file1);
		var email = new MailBox("email", rootDirectory);
		var conversation1 = new Conversation("Test1", email);
		var john = new Person("John", "Smith");
		conversation1.addMessage(new Message("This is a test", john, new Date()));
		var bob = new Person("Bob", "Jones");
		conversation1.addMessage(new Message("This is another test", bob, new Date()));
		email.addChild(conversation1);
		rootDirectory.addChild(email);
		var database = new Database("directory", ["Surname", "First Name"], rootDirectory);
		var dbRecord1 = new DatabaseRecord("1", ["Jones", "Bob"], new TextFile("", "This is Bob Jones"), database);
		database.addChild(dbRecord1);
		var dbRecord2 = new DatabaseRecord("2", ["Smith", "John"], new TextFile("", "This is John Smith"), database);
		database.addChild(dbRecord2);
		rootDirectory.addChild(database);
		var dir3 = new Directory('dir3', dir1);
		dir1.addChild(dir3);
		var file2 = new File("file2.txt", dir1);
		dir1.addChild(file2);
		var file3 = new File('file3.txt', dir2);
		dir2.addChild(file3);
		var localhost = new Computer('localhost', '127.0.0.1', rootDirectory, location);
		return localhost;
	}

	private createDevice1(): Computer{
		var location = new Location(2, 'Test Road', '5678', 'Test Location 1', new Coordinates(1, 1));
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
		return new Computer('device1', '81.1.1.1', rootDirectory, location);
	}

	public get network(): Network {
		return this._network;
	}

}