import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Rosobreseimiento } from '@core/models/Rosobreseimiento';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SobreseimientoService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Rosobreseimiento[]>(this.serverUrl+'sobreseimiento')
  }
  
  public getById(id: number) {
    return this.http.get<Rosobreseimiento>(this.serverUrl + '/' + id)
  }
  
  public create(sobreseimiento: Rosobreseimiento) {
    return this.http.post<Rosobreseimiento>(this.serverUrl + 'sobreseimiento', sobreseimiento)
  }
  
  public update(id: number, sobreseimiento: Rosobreseimiento) {
    return this.http.put<Rosobreseimiento>(this.serverUrl + 'sobreseimiento/' + id, sobreseimiento)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'sobreseimiento/' + id)
  }

}
