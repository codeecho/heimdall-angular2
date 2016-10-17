import { Component, Input, Inject, ElementRef, AfterViewInit, ViewChild, NgZone} from '@angular/core';
import { Terminal } from './terminal';
import { Log } from '../log/log';
import {Shell} from './shell';
import {Device} from '../../model/device/device';
import {Directory} from '../../model/device/directory';
import {File} from '../../model/device/file';
import {Connection} from '../../model/device/connection';
import {Network} from '../../model/Network';
import {Location} from '../../model/Location';

const enum Tab{
  Explorer,
  File,
  Map
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
  @Input()
  network: Network;

  connection: Connection;

  private _el: HTMLElement;
  private _zone: NgZone;
  private _shell: Shell;

  activeTab: Tab;
  openFile: File;
  selectedLocation: Location;

  constructor(@Inject(ElementRef) elementRef: ElementRef, @Inject(NgZone) zone: NgZone) {
    super();
    this._el = elementRef.nativeElement;
    this._zone = zone;
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

    this._shell.addCommandHandler("connect", (cmd, args, callback) => {
      this._zone.run(() => {
        if(args.length != 1 || args[0] == null){
          return callback();
        }
        var ipAddress = args[0];
        var device = this.network.getDevice(ipAddress);
        if(device == null){
          return callback();
        }
        this.connection = new Connection(device);
        this._shell.rootDirectory = this.connection.currentDirectory;
        this.activeTab = Tab.Explorer;
        callback();
      });
    });

    this._shell.addCommandHandler("disconnect", (cmd, args, callback) => {
      this._zone.run(() => {
        this.connection = new Connection(this.network.localhost);
        this._shell.rootDirectory = this.connection.currentDirectory;
        this.activeTab = Tab.Explorer;
        callback();
      });
    });

    this._shell.addCommandHandler("locate-address", (cmd, args, callback) => {
      this._zone.run(() => {
        this.selectedLocation = this.connection.device.location;
        this.activeTab = Tab.Map;
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

    this.terminal.onOpen(() => {
      this.connection = new Connection(this.network.localhost);
      this._shell.rootDirectory = this.connection.currentDirectory;
      this.activeTab = Tab.Explorer;
    });

    this.terminal.onActivate(() => {
      this.activate();
    });

  }

  activate(): void{
    this._shell.activate();
    $(".terminal").removeClass("active");
    $(this._el).find('.terminal').addClass("active");
  }

  close(): void{
    this.log.debug("Terminating terminal...");
    this.terminal.close();
    this.connection = new Connection(this.network.localhost);
    this.activeTab = Tab.Explorer;
    this._shell.rootDirectory = this.connection.currentDirectory;
    this.log.debug("Terminal shutdown successfully");
  }

  isExplorerTabActive(): boolean{
    return this.isTabActive(Tab.Explorer);
  }

  isFileTabActive(): boolean{
    return this.isTabActive(Tab.File);
  }

  isMapTabActive(): boolean{
    return this.isTabActive(Tab.Map);
  }

  isTabActive(tab: Tab){
    return this.activeTab == tab;
  }

}
