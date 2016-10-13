import { Component, Input, Inject, ElementRef, AfterViewInit, ViewChild, NgZone} from '@angular/core';
import { Terminal } from './terminal';
import { Log } from '../log/log';
import {Shell} from './shell';
import {Device} from '../../model/device/device';
import {Directory} from '../../model/device/directory';
import {File} from '../../model/device/file';
import {Connection} from '../../model/device/connection';
import {Demo} from '../../demo/demo';

const enum Tab{
  Explorer,
  File
} 

@Component({
  selector: 'terminal',
  templateUrl: 'component/terminal/terminal.html'
})

export class TerminalComponent extends AfterViewInit{ 
  @Input()
  terminal: Terminal;
  @Input()
  log: Log;
  connection: Connection;

  private _el: HTMLElement;
  private _zone: NgZone;
  private _shell: Shell;
  private _demo: Demo;
  private _localhost: Device;

  activeTab: Tab = Tab.Explorer;
  openFile: File;

  constructor(@Inject(ElementRef) elementRef: ElementRef, @Inject(NgZone) zone: NgZone) {
    super();
    this._el = elementRef.nativeElement;
    this._zone = zone;
    this._demo = new Demo();
    this._localhost = this._demo.localhost;
    this.connection = new Connection(this._localhost);
	}

  ngAfterViewInit(): void{
    this._shell = new Shell(this.terminal.id);

    var terminalComponent: TerminalComponent = this;
    this._shell.addCommandHandler("exit", function(cmd, args, callback){
            terminalComponent.close();
            callback();
    });

    this._shell.addCommandHandler("close", (cmd, args, callback) => {
      this._zone.run(() => {
            this.activeTab = Tab.Explorer;
            this.openFile = null;
            callback();
      });
    });

    this._shell.onChangeDirectory((directory: Directory) => {
      this._zone.run(() => {
        this.activeTab = Tab.Explorer;
        this.connection.currentDirectory = directory;
        this.openFile = null;
      });
    });

    this._shell.onOpenFile((file: File) => {
      this.activeTab = Tab.File;
      this.openFile = file;
    })

    this.terminal.onActivate(() => {
      this.activate();
    });

  }

  activate(): void{
    this.connection = new Connection(this._localhost);
    this.activeTab = Tab.Explorer;
    this._shell.rootDirectory = this.connection.currentDirectory;
    this._shell.activate();
    $(".terminal").removeClass("active");
    $(this._el).find('.terminal').addClass("active");
  }

  close(): void{
    this.log.debug("Terminating terminal...");
    this.terminal.close();
    this.log.debug("Terminal shutdown successfully");
  }

  isExplorerTabActive(): boolean{
    return this.isTabActive(Tab.Explorer);
  }

  isFileTabActive(): boolean{
    return this.isTabActive(Tab.File);
  }

  isTabActive(tab: Tab){
    return this.activeTab == tab;
  }

}
