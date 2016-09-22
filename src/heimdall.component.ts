import { Component, AfterViewInit} from '@angular/core';
import { Terminal } from './terminal';

declare var initTerminals: any;

@Component({
  selector: 'heimdall',
  templateUrl: 'heimdall.html'
})

export class HeimdallComponent implements AfterViewInit{ 
  terminals: Terminal[] = [new Terminal(1), new Terminal(2), new Terminal(3), new Terminal(4), new Terminal(5)];
  
  ngAfterViewInit(){
    initTerminals();
  }
  
  openTerminal(): void {
    for(let terminal of this.terminals){
      if(!terminal.isOpen){
        terminal.open();
        break;
      }
    }
  }
  
}
