import { Component, Input, Inject, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Terminal } from './terminal';
import { Log } from '../log/log';
import {Shell} from './shell';
import {Device} from '../../model/device/device';
import {Connection} from '../../model/device/connection';
import {Demo} from '../../demo/demo';

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
  private _demo: Demo;
  private _localhost: Device;
  private _connection: Connection;

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    super();
    this._el = elementRef.nativeElement;
    this._demo = new Demo();
    this._localhost = this._demo.localhost;
    this._connection = new Connection(this._localhost);
	}

  ngAfterViewInit(): void{
    this._shell = new Shell(this.terminal.id);

    var terminalComponent: TerminalComponent = this;
    this._shell.addCommandHandler("exit", function(cmd, args, callback){
            terminalComponent.close();
            callback();
    });

    this.terminal.onActivate(() => {
      this.activate();
    })
  }

  activate(): void{
    console.log("Activate terminal");
    this._connection = new Connection(this._localhost);
    console.log(this._connection.currentDirectory);
    this._shell.rootDirectory = this._connection.currentDirectory;
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
