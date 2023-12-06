import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Tipoobjecion } from '@core/models/Tipoobjecion';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TipoobjecionService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Tipoobjecion[]>(this.serverUrl+'tipoobjecion')
  }
  
  public getById(id: number) {
    return this.http.get<Tipoobjecion>(this.serverUrl + 'tipoobjecion/' + id)
  }
  
  public create(tipoobjecion: Tipoobjecion) {
    return this.http.post<Tipoobjecion>(this.serverUrl + 'tipoobjecion', tipoobjecion)
  }
  
  public update(id: number, tipoobjecion: Tipoobjecion) {
    return this.http.put<Tipoobjecion>(this.serverUrl + 'tipoobjecion/' + id, tipoobjecion)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'tipoobjecion/' + id)
  }

}
