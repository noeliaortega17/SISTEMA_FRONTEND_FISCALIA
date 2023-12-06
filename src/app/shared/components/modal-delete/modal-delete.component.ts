import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { HelpersService } from '@core/services/helpers.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimeComponentsModule } from '../../prime-components/prime-components.module';
import { PersonService } from 'src/app/modules/persona/services/person.service';
import { CargoService } from 'src/app/modules/cargo/services/cargo.service';
import { UsuarioService } from 'src/app/modules/usuario/services/usuario.service';
import { FuncionarioService } from 'src/app/modules/funcionario/services/funcionario.service';
import { UnidadService } from 'src/app/modules/unidad/services/unidad.service';
import { TipoobjecionService } from 'src/app/modules/tipoobjecion/services/tipoobjecion.service';
import { UserprofileService } from 'src/app/modules/usuarioperfil/services/usuarioperfil.service';
import { DesestimacionService } from 'src/app/modules/registroobjecion/desestimacion/services/desestimacion.service';
import { RechzoService } from 'src/app/modules/registroobjecion/rechzo/services/rechzo.service';
import { SobreseimientoService } from 'src/app/modules/registroobjecion/sobreseimiento/services/sobreseimiento.service';
import { PerfilService } from 'src/app/modules/perfil/services/perfil.service';
import { TipoDelitoService } from 'src/app/modules/tipodelito/services/tipodelito.service';
import { DelitoService } from 'src/app/modules/delito/services/delito.service';
import { DesarchivoService } from 'src/app/modules/desarchivo/services/desarchivo.service';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PrimeComponentsModule ],
  templateUrl: './modal-delete.component.html',
  styles: []
})
export class ModaldeleteComponent implements OnInit {
  @Input() serviceGeneric!: PersonService | CargoService | UsuarioService | FuncionarioService | UnidadService | PerfilService | TipoDelitoService | DelitoService | DesarchivoService | TipoobjecionService | UserprofileService | DesestimacionService | RechzoService | SobreseimientoService |null;
  @Input() object: number | any;
  // tableComponent: any;

  private helpersService = inject(HelpersService);
  
  openModal: boolean = false;

  ngOnInit() {
    if ( this.serviceGeneric ) {
      this.serviceGeneric.eventModalDeleteComponent.emit(this);

      // this.serviceGeneric.eventTableComponent.subscribe((tableComponent: any) => {
      //   console.log(tableComponent);
        
      //   this.tableComponent = tableComponent;
      // });
    }
  }

  public openConfirm() {
      this.openModalDelete(true);
  }

  confirmDelete() {
    this.openModalDelete(false);
    this.serviceGeneric!.delete( parseInt(this.object) ).subscribe({
      next: ( ) => {
        this.helpersService.messageNotification("success", "Correcto", "Se borro correctamente", null);
        // this.tableComponent.reload();
        this.helpersService.reloadGeneric.emit();
      },
      error: (err: any) => { 
        console.log(err);
      }
    })
  }
  openModalDelete(state: any) {
    this.openModal = state;
  }
}







