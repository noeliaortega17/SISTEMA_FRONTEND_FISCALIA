import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Instructivo } from '@core/models/Instructivo';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InstructivoService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Instructivo[]>(this.serverUrl+'instructivo')
  }
  
  public getById(id: number) {
    return this.http.get<Instructivo>(this.serverUrl + 'instructivo/' + id)
  }
  
  public create(instructivo: Instructivo) {
    return this.http.post<Instructivo>(this.serverUrl + 'instructivo', instructivo)
  }
  
  public update(id: number, instructivo: Instructivo) {
    return this.http.put<Instructivo>(this.serverUrl + 'instructivo/' + id, instructivo)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'instructivo/' + id)
  }

}
