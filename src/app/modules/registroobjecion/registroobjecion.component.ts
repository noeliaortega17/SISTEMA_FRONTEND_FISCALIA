import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroObjecionService } from './services/registroobjecion.service';
import { RegistroObjecion } from '@core/models/RegistroObjecion';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { RegistroobjecionModule } from './registroobjecion.module';
import { HelpersService } from '@core/services/helpers.service';

@Component({
  selector: 'app-registroobjecion',
  standalone: true,
  imports: [CommonModule, RegistroobjecionModule, ToolbarComponent, ModaldeleteComponent],
  templateUrl: './registroobjecion.component.html',
  styles: [
  ],
  providers: [ HelpersService]
})
export class RegistroobjecionComponent {
  registroobjecionService = inject(RegistroObjecionService);

  registroobjecion = signal(new RegistroObjecion);   

  ngOnInit(): void {
    this.registroobjecion.set(new RegistroObjecion);
  }

  setObject( registroobjecion:RegistroObjecion  ) {
    this.registroobjecion.set(registroobjecion);
  }
}
