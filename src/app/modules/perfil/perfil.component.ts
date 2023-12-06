import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilService } from './services/perfil.service';
import { Perfil } from '@core/models/Perfil';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { PerfilModule } from './perfil.module';
import { HelpersService } from '@core/services/helpers.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, PerfilModule, ToolbarComponent, ModaldeleteComponent],
  templateUrl: './perfil.component.html',
  styles: [
  ],
  providers: [ HelpersService]
})
export class PerfilComponent {
  perfilService = inject(PerfilService);

  perfil = signal(new Perfil);   

  ngOnInit(): void {
    this.perfil.set(new Perfil);
  }

  setObject( perfil: Perfil  ) {
    this.perfil.set(perfil);
  }

}
