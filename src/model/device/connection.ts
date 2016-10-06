import {Device} from './device';
import {Directory} from './directory';

export class Connection{
    private _device: Device;
    private _currentDirectory: Directory;

	constructor(device: Device) {
		this._device = device;
        this._currentDirectory = device.rootDirectory;
	}

	public get currentDirectory(): Directory {
		return this._currentDirectory;
	}

}