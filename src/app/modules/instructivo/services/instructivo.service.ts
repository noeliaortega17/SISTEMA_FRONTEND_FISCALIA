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

  descargarPdf(base64String: string, nombreArchivo: string): void {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Crear un enlace temporal para la descarga
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = nombreArchivo;

    // Simular clic en el enlace para iniciar la descarga
    link.click();
  }

  convertirArchivoABase64(archivo: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = reject;

      // Leer el contenido del archivo como una cadena Base64
      reader.readAsDataURL(archivo);
    });
  }

}
