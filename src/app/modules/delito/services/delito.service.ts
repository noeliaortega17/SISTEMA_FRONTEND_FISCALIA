import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Delito } from '@core/models/Delito';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DelitoService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Delito[]>(this.serverUrl+'delito')
  }
  
  public getById(id: number) {
    return this.http.get<Delito>(this.serverUrl + 'delito/' + id)
  }
  
  public create(delito: Delito) {
    return this.http.post<Delito>(this.serverUrl + 'delito', delito)
  }
  
  public update(id: number, delito: Delito) {
    return this.http.put<Delito>(this.serverUrl + 'delito/' + id, delito)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'delito/' + id)
  }

}
