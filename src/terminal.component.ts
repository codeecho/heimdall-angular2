import { Component, Input } from '@angular/core';
import { Terminal } from './terminal';

@Component({
  selector: 'terminal',
  templateUrl: 'terminal.html'
})

export class TerminalComponent { 
  @Input()
  terminal: Terminal;
}
