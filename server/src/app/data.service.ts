import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getServers() {
    return this.http.get('http://localhost:3000/servers/');
  }

  getServer(id) {
    return this.http.get('http://localhost:3000/servers/'+id);
  }
}
