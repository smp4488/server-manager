import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
//import { Observer } from 'rxjs/Observer';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: any): void {
        this.socket.emit('message', message);
    }

    public onMessage(message): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on(message, (data: any) => observer.next(data));
        });
    }

    public onEvent(event): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}