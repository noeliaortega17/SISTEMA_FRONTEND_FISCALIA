import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { RegistroObjecion } from '@core/models/RegistroObjecion';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegistroObjecionService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<RegistroObjecion[]>(this.serverUrl+'registroobjecion')
  }
  
  public getById(id: number) {
    return this.http.get<RegistroObjecion>(this.serverUrl + 'registroobjecion/' + id)
  }
  
  public create(registroobjecion: RegistroObjecion) {
    return this.http.post<RegistroObjecion>(this.serverUrl + 'registroobjecion', registroobjecion)
  }
  
  public update(id: number, registroobjecion: RegistroObjecion) {
    return this.http.put<RegistroObjecion>(this.serverUrl + 'registroobjecion/' + id, registroobjecion)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'tipoobjecion/' + id)
  }

}
