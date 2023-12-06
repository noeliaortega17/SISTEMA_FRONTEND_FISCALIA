import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Perfil } from '@core/models/Perfil';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Perfil[]>(this.serverUrl+'perfil')
  }
  
  public getById(id: number) {
    return this.http.get<Perfil>(this.serverUrl + 'perfil/' + id)
  }
  
  public create(perfil: Perfil) {
    return this.http.post<Perfil>(this.serverUrl + 'perfil', perfil)
  }
  
  public update(id: number, perfil: Perfil) {
    return this.http.put<Perfil>(this.serverUrl + 'perfil/' + id, perfil)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'perfil/' + id)
  }

}
