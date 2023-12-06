import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpersService } from '@core/services/helpers.service';
import { DesestimacionService } from './services/desestimacion.service';
import { Rodesestimacion } from '@core/models/Rodesestimacion';
import { DesestimacionModule } from './desestimacion.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-desestimacion',
  standalone: true,
  imports: [DesestimacionModule,ToolbarComponent, ModaldeleteComponent],
  templateUrl: './desestimacion.component.html',
  styles: [
  ],
  providers: [ HelpersService]
})
export class DesestimacionComponent {
  desestimacionService = inject(DesestimacionService);

  desestimacion = signal(new Rodesestimacion);   

  ngOnInit(): void {
    this.desestimacion.set(new Rodesestimacion);
  }

  setObject( desestimacion: Rodesestimacion  ) {
    this.desestimacion.set(desestimacion);
  }
}
