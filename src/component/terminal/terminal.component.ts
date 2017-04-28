import { Component, Input, Inject, ElementRef, AfterViewInit, ViewChild, NgZone} from '@angular/core';
import { Terminal } from './terminal';
import { Log } from '../log/log';
import {Shell} from './shell';
import {Device} from '../../model/device/device';
import {Directory} from '../../model/device/directory';
import {File} from '../../model/device/file';
import {Database} from '../../model/device/database';
import {DatabaseRecord} from '../../model/device/database_record';
import {TextFile} from '../../model/device/text_file';
import {Conversation} from '../../model/device/conversation';
import {Connection} from '../../model/device/connection';
import {MailBox} from '../../model/device/mail_box';
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
  identifiedDevices: Device[];
  isLoading: boolean = false;

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
          return callback("1 argument expected");
        }
        this.load((done) => {
          var ipAddress = args[0];
          this.log.debug("Connecting to " + ipAddress + "...");
          var device = this.network.getDevice(ipAddress);
          if(device == null){
            callback("Unknown host");
            this.log.debug("Connection failed: Unknown host");
            return done();
          }
          done(() => {
            this.connection = new Connection(device);
            this._shell.rootDirectory = this.connection.currentDirectory;
            this.activeTab = Tab.Explorer;
            this.log.debug("Connection established");
            callback();
          });
        }, 1000);
      });
    });

    this._shell.addCommandHandler("disconnect", (cmd, args, callback) => {
      this._zone.run(() => {
        this.connection = new Connection(this.network.localhost);
        this._shell.rootDirectory = this.connection.currentDirectory;
        this.activeTab = Tab.Explorer;
        this.log.debug("Disconnected");
        callback();
      });
    });

    this._shell.addCommandHandler("locate-address", (cmd, args, callback) => {
      this._zone.run(() => {
        if(args.length < 2){
          callback("2 arguments expected");
          return;
        }
        this.load((done) => {
          var number:number = parseInt(args[0]);
          var postalCode = args[1];
          this.log.debug("Locating address: " + number + " " + postalCode + "...");
          var location = this.network.getLocation(number, postalCode);
          if(location == null){
            callback("Address not found");
            this.log.debug("Address not found");
            done();
            return;
          }
          done(() => {
            this.identifiedDevices = null;
            this.selectedLocation = location;
            this.activeTab = Tab.Map;
            this.log.debug("Address located");
            callback();
          });
        }, 3000);
      });
    });
    this._shell.addCommandHandler("scan-location", (cmd, args, callback) => {
      this._zone.run(() => {
        if(this.activeTab != Tab.Map || !this.selectedLocation){
          callback("No location selected");
          return;
        }
        this.load((done) => {
          this.log.debug("Scanning location for devices...");
          done(() => {
            this.identifiedDevices = this.network.getDevices(this.selectedLocation);
            this.identifiedDevices.forEach((device) => {
              this.log.debug("Device found: " + device.ipAddress);
            });
            this.log.debug("Scan complete");
            callback();
          });
        }, 3000);
      });
    });

    this._shell.addCommandHandler("filter", (cmd, args: string[], callback) => {
      this._zone.run(() => {
        if(!this.isDatabaseTabActive()){
          callback("No database selected");
          return;
        }
        if(args.length == 0){
          callback("No filter specified");
          return;
        }
        var database = <Database>this.connection.currentDirectory;
        database.filter(args[0]);
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
      if(file instanceof DatabaseRecord){
        this.openFile = file.file;
      }
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
    return this.isTabActive(Tab.Explorer) && !(this.connection.currentDirectory instanceof MailBox) && !(this.connection.currentDirectory instanceof Database);
  }

  isMailBoxTabActive(): boolean{
    return this.isTabActive(Tab.Explorer) && this.connection.currentDirectory instanceof MailBox;
  }

  isDatabaseTabActive(): boolean{
    return this.isTabActive(Tab.Explorer) && this.connection.currentDirectory instanceof Database;
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

  isTextFile(): boolean{
    return this.openFile instanceof TextFile;
  }

  isConversation(): boolean{
    return this.openFile instanceof Conversation;
  }

  private loadingTime: number;

  private load(f: (done: (onLoad?: () => void) => void) => void, minLoadTime: number){
    this.loadingTime = new Date().getTime();
    this.isLoading = true;
    f((onLoad: () => void) => {
      var remainingLoadTime: number = this.loadingTime - new Date().getTime() + minLoadTime;
      if(remainingLoadTime < 0){
        remainingLoadTime = 0;
      } 
      setTimeout(() => {
        if(onLoad){
          onLoad();
        }
        this.isLoading = false;
      }, remainingLoadTime);
    });
  }

}
