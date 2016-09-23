import {LogMessage} from './logMessage';

export class Log {
    private _messages: LogMessage[];

	constructor() {
        this._messages = new Array<LogMessage>();
	}

    debug(message: string):void {
        this._messages.push(new LogMessage(message));
    }

	public get messages(): LogMessage[] {
		return this._messages;
	}
}