import {Person} from '../person';

export class Message {

	private _text: string;
	private _author: Person;
	private _time: Date;

  constructor(text: string, author: Person, time: Date) {
			this._text = text;
			this._author = author;
			this._time = time;
	}

	public get text(): string {
		return this._text;
	}

	public get author(): Person {
		return this._author;
	}
	
	public get time(): Date {
		return this._time;
	}
	
}