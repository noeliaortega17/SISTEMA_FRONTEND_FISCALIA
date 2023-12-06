import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesarchivoService } from './services/desarchivo.service';
import { Desarchivo } from '@core/models/Desarchivo';
import { HelpersService } from '@core/services/helpers.service';
import { DesarchivoModule } from './desarchivo.module';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-desarchivo',
  standalone: true,
  imports: [CommonModule, DesarchivoModule, ModaldeleteComponent, ToolbarComponent],
  templateUrl: './desarchivo.component.html',
  styles: [
  ],
  providers: [ HelpersService]
})
export class DesarchivoComponent {
  desarchivoService = inject(DesarchivoService);

  desarchivo = signal(new Desarchivo);   

  ngOnInit(): void {
    this.desarchivo.set(new Desarchivo);
  }

  setObject( desarchivo: Desarchivo  ) {
    this.desarchivo.set(desarchivo);
  }
}
