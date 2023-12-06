import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpersService } from '@core/services/helpers.service';
import { SobreseimientoService } from './services/sobreseimiento.service';
import { Rosobreseimiento } from '@core/models/Rosobreseimiento';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { SobreseimientoModule } from './sobreseimiento.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-sobreseimiento',
  standalone: true,
  imports: [SobreseimientoModule,ToolbarComponent, ModaldeleteComponent],
  templateUrl: './sobreseimiento.component.html',
  styles: [
  ],
  providers: [ HelpersService]
})
export class SobreseimientoComponent {
  sobreseimientoService = inject(SobreseimientoService);

  sobreseimiento = signal(new Rosobreseimiento);   

  ngOnInit(): void {
    this.sobreseimiento.set(new Rosobreseimiento);
  }

  setObject( sobreseimiento: Rosobreseimiento  ) {
    this.sobreseimiento.set(sobreseimiento);
  }
}
