import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { TipoDelito } from '@core/models/TipoDelito';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TipoDelitoService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<TipoDelito[]>(this.serverUrl+'tipoDelito')
  }
  
  public getById(id: number) {
    return this.http.get<TipoDelito>(this.serverUrl + 'tipoDelito/' + id)
  }
  
  public create(tipoDelito: TipoDelito) {
    return this.http.post<TipoDelito>(this.serverUrl + 'tipoDelito', tipoDelito)
  }
  
  public update(id: number, tipoDelito: TipoDelito) {
    return this.http.put<TipoDelito>(this.serverUrl + 'tipoDelito/' + id, tipoDelito)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'tipoDelito/' + id)
  }

}
