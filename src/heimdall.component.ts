import { Component } from '@angular/core';
import { Terminal } from './terminal';
@Component({
  selector: 'heimdall',
  templateUrl: 'heimdall.html'
})
export class HeimdallComponent { 
  terminals = Terminal[];
  
  createNewTerminal(): void {
    terminals.add(new Terminal(1));
  }
}
