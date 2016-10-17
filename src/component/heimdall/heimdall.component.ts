import { Component, AfterViewInit} from '@angular/core';
import { Terminal } from '../terminal/terminal';
import { Log } from '../log/log';
import {Demo} from '../../demo/demo';
import {Network} from '../../model/network';

declare var initTerminals: any;

@Component({
  selector: 'heimdall',
  templateUrl: 'component/heimdall/heimdall.html'
})

export class HeimdallComponent implements AfterViewInit{
  
  terminals: Terminal[]
  log: Log = new Log();
  network: Network;


	constructor() {
    this.log = new Log();
    this.terminals = [new Terminal(1), new Terminal(2), new Terminal(3), new Terminal(4), new Terminal(5)];
    this.network = new Demo().network;
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

    setTimeout(() => {
      this.openTerminal();
    }, 1);
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
