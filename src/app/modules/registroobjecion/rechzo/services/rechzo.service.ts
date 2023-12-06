import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Rorechazo } from '@core/models/Rorechazo';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RechzoService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Rorechazo[]>(this.serverUrl+'rechzo')
  }
  
  public getById(id: number) {
    return this.http.get<Rorechazo>(this.serverUrl + 'rechzo/' + id)
  }
  
  public create(rechzo: Rorechazo) {
    return this.http.post<Rorechazo>(this.serverUrl + 'rechzo', rechzo)
  }
  
  public update(id: number, rechzo: Rorechazo) {
    return this.http.put<Rorechazo>(this.serverUrl + 'rechzo/' + id, rechzo)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'rechzo/' + id)
  }

}
