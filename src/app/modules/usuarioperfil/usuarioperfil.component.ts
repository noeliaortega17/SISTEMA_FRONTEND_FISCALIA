import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileService } from './services/usuarioperfil.service';
import { Userprofile } from '@core/models/Userprofile';
import { HelpersService } from '@core/services/helpers.service';
import { UsuarioperfilModule } from './usuarioperfil.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-usuarioperfil',
  standalone: true,
  imports: [UsuarioperfilModule, ToolbarComponent, ModaldeleteComponent],
  templateUrl: './usuarioperfil.component.html',
  styles: [
  ],
  providers: [ HelpersService]
})
export class UsuarioperfilComponent {
  userprofileService = inject(UserprofileService);

  usuarioperfil = signal(new Userprofile);   

  ngOnInit(): void {
    this.usuarioperfil.set(new Userprofile);
  }

  setObject( usuarioperfil: Userprofile  ) {
    this.usuarioperfil.set(usuarioperfil);
  }
}
