import {File} from './file';
import {Directory} from './directory';
import {Message} from './message';

export class Conversation extends File{

	private _messages: Message[];
	private _lastMessageTime: Date;

  	constructor(title: string, parent: Directory) {
		super(title, parent);
		this._messages = [];
	}

	public get messages(): Message[] {
		return this._messages;
	}

	public addMessage(message: Message): void{
		this._messages.push(message);
		this._lastMessageTime = message.time;
	}

	public get lastMessageTime(): Date {
		return this._lastMessageTime;
	}	
	
}