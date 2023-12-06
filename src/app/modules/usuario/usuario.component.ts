import { Component, inject, signal } from '@angular/core';
import { User } from '@core/models/User';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { UsuarioModule } from './usuario.module';
import { UsuarioService } from './services/usuario.service';
import { HelpersService } from '@core/services/helpers.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [ UsuarioModule, ToolbarComponent, ModaldeleteComponent],
  templateUrl: './usuario.component.html',
  styles: [
  ],
  providers: [ HelpersService ]
})
export class UsuarioComponent {
  userService = inject(UsuarioService);

  usuario = signal(new User);   

  ngOnInit(): void {
    this.usuario.set(new User);
  }

  setObject( usuario: User  ) {
    this.usuario.set(usuario);
  }

}
