import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Userprofile } from '@core/models/Userprofile';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Userprofile[]>(this.serverUrl+'usuarioperfil')
  }
  
  public getById(id: number) {
    return this.http.get<Userprofile>(this.serverUrl + 'usuarioperfil/' + id)
  }
  
  public create(usuarioperfil: Userprofile) {
    return this.http.post<Userprofile>(this.serverUrl + 'usuarioperfil', usuarioperfil)
  }
  
  public update(id: number, usuarioperfil: Userprofile) {
    return this.http.put<Userprofile>(this.serverUrl + 'usuarioperfil/' + id, usuarioperfil)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'usuarioperfil/' + id)
  }

}
