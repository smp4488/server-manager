import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../websocket.service';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {

  servers : any;
  ioConnection: any;

  constructor(private socketService: SocketService, private data: DataService) {
    this.servers = [];
  }

  ngOnInit(): void {
    this.initIoConnection();
    this.data.getServers().subscribe(
      data => this.servers = data 
    );
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onMessage('hosts')
      .subscribe((hosts: any) => {
        this.servers = [];
        console.log('hosts',hosts);
        for (let id of Object.keys(hosts)) {
          hosts[id].id = id;
          this.servers.push(hosts[id]);
        }
      });

    this.socketService.onMessage('system_connected')
      .subscribe((server: any) => {
        console.log('message',server);
        this.servers.push(server);
      });

    this.socketService.onEvent('connect')
      .subscribe(() => {
        console.log('connected');
      });
      
    this.socketService.onEvent('disconnect')
      .subscribe(() => {
        console.log('disconnected');
      });
  }

}
