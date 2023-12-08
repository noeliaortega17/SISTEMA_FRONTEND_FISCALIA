import { Component, inject } from '@angular/core';
import { HelpersService } from '@core/services/helpers.service';
import { TipoobjecionService } from '../../services/tipoobjecion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableComponent } from '../table/table.component';
import { Tipoobjecion } from '@core/models/Tipoobjecion';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styles: [
  ]
})
export class ModalFormComponent {
  private formBuilder = inject(FormBuilder);
  private helpersService = inject(HelpersService);
  private tipoobjecionService = inject(TipoobjecionService);

  ngOnInit() {
    this.tipoobjecionService.eventFormComponent.emit(this);
    this.tipoobjecionService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  };

  tipoobjecion!: Tipoobjecion; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formTipoObjecion: FormGroup = this.formBuilder.group({
    id: [],
    descripcion: [, Validators.required,],
  });

  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nuevo";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editars";
    this.tipoobjecionService.getById(id).subscribe({
      next: (res) => {
        this.tipoobjecion = res;
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
    if (this.formTipoObjecion.valid) {
      if(this.tipoobjecion.id){
        this.submitUpdate(this.tipoobjecion.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formTipoObjecion.reset();
    this.tipoobjecion = new Tipoobjecion;
    
  };

  submitCreate() {
    const data: Tipoobjecion = {
      ...this.formTipoObjecion.value,
    };
    this.tipoobjecionService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `El Tipo Objecion ${res.descripcion} ha sido creado.`, 3000);
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
    const data: Tipoobjecion = {
      ...this.formTipoObjecion.value,
    };
    this.tipoobjecionService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedTipoobjecion.set( res );
          this.helpersService.messageNotification("success", "Correcto", `El Tipo de Objecion  ${res.descripcion} ha sido actualizado.`, 3000);
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
