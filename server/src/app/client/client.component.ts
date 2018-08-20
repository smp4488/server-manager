import { Component, OnInit } from '@angular/core';
import { SocketService } from '../websocket.service';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  client: any;
  objectKeys = Object.keys;

  constructor(private socketService: SocketService, private data: DataService, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => this.client = params.id );
  }

  ngOnInit(): void {
    this.data.getServer(this.client).subscribe(
      data => this.client = data 
    );

    this.initIoConnection();

  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onMessage('host')
      .subscribe((host: any) => {
        console.log('hosts',host);
        this.client = host;
      });

  }

}
