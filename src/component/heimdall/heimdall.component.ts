import { Component, AfterViewInit} from '@angular/core';
import { Terminal } from '../terminal/terminal';
import {Shell} from '../terminal/shell';
import { Log } from '../log/log';

declare var initTerminals: any;

@Component({
  selector: 'heimdall',
  templateUrl: 'component/heimdall/heimdall.html'
})

export class HeimdallComponent implements AfterViewInit{
  
  terminals: Terminal[]
  log: Log = new Log();


	constructor() {
    this.log = new Log();
    this.terminals = [new Terminal(new Shell(1)), new Terminal(new Shell(2))];
	}
  
  ngAfterViewInit(){
    initTerminals();

    $(document).keydown((event) => {
      if(event.altKey && event.keyCode == 84){
        event.preventDefault();
        this.openTerminal();
      }
    });

    this.log.debug("Connecting to server...");
    this.log.debug("Connected");
    this.log.debug("Running diagnostics...");
    this.log.debug("System secure");

    this.openTerminal();
  }
  
  openTerminal(): void {
    for(let terminal of this.terminals){
      if(!terminal.isOpen){
        this.log.debug("Initialising terminal...");
        terminal.open();
        this.log.debug("Terminal initialised");
        break;
      }
    }
  }
  
}
