import {Device} from './device/device'
import {Computer} from './device/computer'
import {Location} from './location';

export class Network {
    private _localhost: Computer;
    private _devices: Device[];
    private _locations: Location[];

    constructor(localhost: Computer, devices: Device[], locations: Location[]) {
        this._localhost = localhost;
        this._devices = devices;
        this._locations = locations;
    }

    public get localhost(): Computer {
        return this._localhost;
    }

	public get devices(): Device[] {
		return this._devices;
	}

	public get locations(): Location[] {
		return this._locations;
	}

    public getDevice(ipAddress: string): Device{
        return this._devices.find((device) => {
            return device.ipAddress == ipAddress;
        });
    }

    public getDevices(location: Location): Device[]{
        return this._devices.filter((device) => {
            return device.location == location;
        });
    }

    public getLocation(number: number, postalCode: string): Location{
        return this._locations.find((location) => {
            return location.number == number && location.postalCode == postalCode;
        });
    }

}