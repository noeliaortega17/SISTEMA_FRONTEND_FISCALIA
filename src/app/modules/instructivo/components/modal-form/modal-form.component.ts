import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { InstructivoService } from '../../services/instructivo.service';
import { Instructivo } from '@core/models/Instructivo';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styles: [
  ]
})
export class ModalFormComponent {

  private formBuilder = inject(FormBuilder);
  private helpersService = inject(HelpersService);
  private instructivoService = inject(InstructivoService);

  ngOnInit() {
    this.instructivoService.eventFormComponent.emit(this);
    this.instructivoService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  };

  instructivo!: Instructivo; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formInstructivo: FormGroup = this.formBuilder.group({
    id: [],
    cite: [, Validators.required,],
    descripcion: [, [Validators.required]],
    fiscaliaGeneral: [, Validators.required,],
    fechaInstructivo: [, Validators.required,],
  });

  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nuevo Instructivo";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Instructivo";
    this.instructivoService.getById(id).subscribe({
      next: (res) => {
        this.instructivo = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  saveInstructivo() {
    this.isLoading = true;
    if (this.formInstructivo.valid) {
      if(this.instructivo.id){
        this.submitUpdate(this.instructivo.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formInstructivo.reset();
    this.instructivo = new Instructivo;
    
  };

  submitCreate() {
    const data: Instructivo = {
      ...this.formInstructivo.value,
    };
    this.instructivoService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `El instructivo con el cite: ${res.cite} , ha sido creado.`, 3000);
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
    const data: Instructivo = {
      ...this.formInstructivo.value,
    };
    this.instructivoService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedInstructivo.set( res );
          this.helpersService.messageNotification("success", "Correcto", `El instructivo con el cite: ${res.cite} , ha sido actualizado.`, 3000);
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
