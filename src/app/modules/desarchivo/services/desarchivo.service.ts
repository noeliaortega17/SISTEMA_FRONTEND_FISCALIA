import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Delito } from '@core/models/Delito';
import { Desarchivo } from '@core/models/Desarchivo';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DesarchivoService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Desarchivo[]>(this.serverUrl+'desarchivo')
  }
  
  public getById(id: number) {
    return this.http.get<Desarchivo>(this.serverUrl + 'desarchivo/' + id)
  }
  
  public create(desarchivo: Desarchivo) {
    return this.http.post<Desarchivo>(this.serverUrl + 'desarchivo', desarchivo)
  }
  
  public update(id: number, desarchivo: Delito) {
    return this.http.put<Desarchivo>(this.serverUrl + 'desarchivo/' + id, desarchivo)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'desarchivo/' + id)
  }

}
