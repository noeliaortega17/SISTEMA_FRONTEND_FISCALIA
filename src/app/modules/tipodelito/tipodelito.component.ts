import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDelitoService } from './services/tipodelito.service';
import { TipoDelito } from '@core/models/TipoDelito';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { TipodelitoModule } from './tipodelito.module';
import { HelpersService } from '@core/services/helpers.service';

@Component({
  selector: 'app-tipodelito',
  standalone: true,
  imports: [CommonModule, TipodelitoModule, ToolbarComponent, ModaldeleteComponent],
  templateUrl: './tipodelito.component.html',
  styles: [
  ],
  providers: [ HelpersService]
})
export class TipodelitoComponent {
  tipoDelitoService = inject(TipoDelitoService);

  tipoDelito = signal(new TipoDelito);   

  ngOnInit(): void {
    this.tipoDelito.set(new TipoDelito);
  }

  setObject( tipoDelito: TipoDelito  ) {
    this.tipoDelito.set(tipoDelito);
  }
}
