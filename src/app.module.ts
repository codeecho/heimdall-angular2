import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeimdallComponent }   from './heimdall.component';
import { TerminalComponent }   from './terminal.component';
@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ HeimdallComponent, TerminalComponent ],
  bootstrap:    [ HeimdallComponent ]
})
export class AppModule { }
