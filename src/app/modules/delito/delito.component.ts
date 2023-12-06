import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelitoService } from './services/delito.service';
import { Delito } from '@core/models/Delito';
import { HelpersService } from '@core/services/helpers.service';
import { DelitoModule } from './delito.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-delito',
  standalone: true,
  imports: [CommonModule, DelitoModule, ToolbarComponent, ModaldeleteComponent],
  templateUrl: './delito.component.html',
  styles: [
  ],
  providers: [ HelpersService]
})
export class DelitoComponent {
  delitoService = inject(DelitoService);

  delito = signal(new Delito);   

  ngOnInit(): void {
    this.delito.set(new Delito);
  }

  setObject( delito: Delito  ) {
    this.delito.set(delito);
  }
}
