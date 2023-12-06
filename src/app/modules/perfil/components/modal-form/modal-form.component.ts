import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoDelito } from '@core/models/TipoDelito';
import { HelpersService } from '@core/services/helpers.service';
import { TipoDelitoService } from 'src/app/modules/tipodelito/services/tipodelito.service';
import { TableComponent } from '../table/table.component';
import { PerfilService } from '../../services/perfil.service';
import { Perfil } from '@core/models/Perfil';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styles: [
  ]
})
export class ModalFormComponent {
  private formBuilder = inject(FormBuilder);
  private helpersService = inject(HelpersService);
  private perfilService = inject(PerfilService);

  ngOnInit() {
    this.perfilService.eventFormComponent.emit(this);
    this.perfilService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  };

  perfil!: Perfil; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formPerfil: FormGroup = this.formBuilder.group({
    id: [],
    descripcion: [, Validators.required,],
  });

  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nuevo Perfil";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Perfil";
    this.perfilService.getById(id).subscribe({
      next: (res) => {
        this.perfil = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  savePerfil() {
    this.isLoading = true;
    if (this.formPerfil.valid) {
      if(this.perfil.id){
        this.submitUpdate(this.perfil.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formPerfil.reset();
    this.perfil = new Perfil;
    
  };

  submitCreate() {
    const data: Perfil = {
      ...this.formPerfil.value,
    };
    this.perfilService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `El perfil ${res.descripcion} ha sido creado.`, 3000);
        this.hideModal();
        this.reset();
      },
      error: (err) => { 
        this.isLoading = false;
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };
  
  submitUpdate(idParameter : number) {
    const data: Perfil = {
      ...this.formPerfil.value,
    };
    this.perfilService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedPerfil.set( res );
          this.helpersService.messageNotification("success", "Correcto", `El perfil  ${res.descripcion} ha sido actualizado.`, 3000);
          this.hideModal();
          this.reset();
        },
        error: (err) => { 
          console.log(err);
          this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
          this.isLoading = false;
        }
    })
  }
}
