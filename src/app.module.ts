import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeimdallComponent }   from './heimdall.component';
import { TerminalComponent }   from './terminal.component';
import { LogComponent }   from './log.component';
@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ HeimdallComponent, TerminalComponent, LogComponent ],
  bootstrap:    [ HeimdallComponent ]
})
export class AppModule { }
