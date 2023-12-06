import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Rodesestimacion } from '@core/models/Rodesestimacion';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DesestimacionService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Rodesestimacion[]>(this.serverUrl+'desestimacion')
  }
  
  public getById(id: number) {
    return this.http.get<Rodesestimacion>(this.serverUrl + 'desestimacion/' + id)
  }
  
  public create(desestimacion: Rodesestimacion) {
    return this.http.post<Rodesestimacion>(this.serverUrl + 'desestimacion', desestimacion)
  }
  
  public update(id: number, desestimacion: Rodesestimacion) {
    return this.http.put<Rodesestimacion>(this.serverUrl + 'desestimacion/' + id, desestimacion)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'desestimacion/' + id)
  }

}
