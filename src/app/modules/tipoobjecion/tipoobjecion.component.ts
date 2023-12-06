import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoobjecionService } from './services/tipoobjecion.service';
import { Tipoobjecion } from '@core/models/Tipoobjecion';
import { HelpersService } from '@core/services/helpers.service';
import { TipoobjecionModule } from './tipoobjecion.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-tipoobjecion',
  standalone: true,
  imports: [TipoobjecionModule,ToolbarComponent, ModaldeleteComponent],
  templateUrl: './tipoobjecion.component.html',
  styles: [
  ],
  providers: [ HelpersService]
})
export class TipoobjecionComponent {
  tipoobjecionService = inject(TipoobjecionService);

  tipoobjecion = signal(new Tipoobjecion);   

  ngOnInit(): void {
    this.tipoobjecion.set(new Tipoobjecion);
  }

  setObject( tipoobjecion: Tipoobjecion  ) {
    this.tipoobjecion.set(tipoobjecion);
  }
}
