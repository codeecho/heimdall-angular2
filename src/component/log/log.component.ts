import { Component, Input } from '@angular/core';
import { Log } from './log';

@Component({
    selector: 'log',
    templateUrl: 'component/log/log.html'
})
export class LogComponent{
    @Input()
    log: Log;
}