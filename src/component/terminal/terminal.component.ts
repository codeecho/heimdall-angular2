import { Component, Input, Inject, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Terminal } from './terminal';
import { Log } from '../log/log';
import {Shell} from './shell';

@Component({
  selector: 'terminal',
  templateUrl: 'component/terminal/terminal.html'
})

export class TerminalComponent extends AfterViewInit{ 
  @Input()
  terminal: Terminal;
  @Input()
  log: Log;
  private _el: HTMLElement;
  private _shell: Shell;

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    super();
    this._el = elementRef.nativeElement;
	}

  ngAfterViewInit(): void{
    this._shell = new Shell(this.terminal.id);

    var terminalComponent: TerminalComponent = this;
    this._shell.addCommandHandler("exit", function(cmd, args, callback){
            console.log(this);
            terminalComponent.close();
    });

    this.terminal.onActivate(() => {
      this._shell.activate();
    })
  }

  activate(): void{
    console.log("Activate terminal");
    this._shell.activate();
    $(".terminal").removeClass("active");
    $(this._el).find('.terminal').addClass("active");
  }

  close(): void{
    this.log.debug("Terminating terminal...");
    this.terminal.close();
    this.log.debug("Terminal shutdown successfully");
  }

}
