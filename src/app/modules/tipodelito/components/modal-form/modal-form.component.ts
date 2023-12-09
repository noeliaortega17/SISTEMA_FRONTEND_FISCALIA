import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoDelito } from '@core/models/TipoDelito';
import { HelpersService } from '@core/services/helpers.service';
import { PerfilService } from 'src/app/modules/perfil/services/perfil.service';
import { TableComponent } from '../table/table.component';
import { TipoDelitoService } from '../../services/tipodelito.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styles: [
  ]
})
export class ModalFormComponent {
  private formBuilder = inject(FormBuilder);
  private helpersService = inject(HelpersService);
  private tipoDelitoService = inject(TipoDelitoService);

  ngOnInit() {
    this.tipoDelitoService.eventFormComponent.emit(this);
    this.tipoDelitoService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  };

  tipoDelito!: TipoDelito; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formTipoDelito: FormGroup = this.formBuilder.group({
    id: [],
    descripcion: [, Validators.required,],
  });

  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nuevo Tipo Delito";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Tipo Delito";
    this.tipoDelitoService.getById(id).subscribe({
      next: (res) => {
        this.tipoDelito = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  saveTipoDelito() {
    this.isLoading = true;
    if (this.formTipoDelito.valid) {
      if(this.tipoDelito.id){
        this.submitUpdate(this.tipoDelito.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formTipoDelito.reset();
    this.tipoDelito = new TipoDelito;
    
  };

  submitCreate() {
    const data: TipoDelito = {
      ...this.formTipoDelito.value,
    };
    this.tipoDelitoService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `El tipo delito ${res.descripcion} ha sido creado.`, 3000);
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
    const data: TipoDelito = {
      ...this.formTipoDelito.value,
    };
    this.tipoDelitoService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedTipoDelito.set( res );
          this.helpersService.messageNotification("success", "Correcto", `El Tipo de Delito  ${res.descripcion} ha sido actualizado.`, 3000);
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
