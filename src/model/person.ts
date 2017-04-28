export class Person{

    private _firstName: string;
    private _surname: string;

	constructor(firstName: string, surname: string) {
		this._firstName = firstName;
		this._surname = surname;
	}

	public get firstName(): string {
		return this._firstName;
	}

	public get surname(): string {
		return this._surname;
	}

}