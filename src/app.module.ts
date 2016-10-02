import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HeimdallComponent }   from './component/heimdall/heimdall.component';
import { TerminalComponent }   from './component/terminal/terminal.component';
import { ShellComponent }   from './component/terminal/shell.component';
import { LogComponent }   from './component/log/log.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ HeimdallComponent, TerminalComponent, LogComponent, ShellComponent ],
  bootstrap:    [ HeimdallComponent ]
})
export class AppModule { }
