import { Component, Input, Inject, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Terminal } from './terminal';
import { Log } from '../log/log';
import {ShellComponent} from './shell.component';

@Component({
  selector: 'terminal',
  templateUrl: 'component/terminal/terminal.html'
})

export class TerminalComponent extends AfterViewInit{ 
  @Input()
  terminal: Terminal;
  @Input()
  log: Log;
  @ViewChild(ShellComponent) shellComponent: ShellComponent;
  private _el: HTMLElement;

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    super();
    this._el = elementRef.nativeElement;
	}

  ngAfterViewInit(): void{

  }

  activate(): void{
    console.log("Activate terminal");
    this.shellComponent.activate();
    $(".terminal").removeClass("active");
    $(this._el).find('.terminal').addClass("active");
  }

  close(): void{
    this.log.debug("Terminating terminal...");
    this.terminal.close();
    this.log.debug("Terminal shutdown successfully");
  }

}
