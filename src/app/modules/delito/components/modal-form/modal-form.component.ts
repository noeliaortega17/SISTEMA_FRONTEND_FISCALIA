import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { TableComponent } from '../table/table.component';
import { DelitoService } from '../../services/delito.service';
import { TipoDelitoService } from 'src/app/modules/tipodelito/services/tipodelito.service';
import { Delito } from '@core/models/Delito';
import { TipoDelito } from '@core/models/TipoDelito';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styles: [
  ]
})
export class ModalFormComponent {
  private formBuilder = inject(FormBuilder);
  private helpersService = inject(HelpersService);
  private delitoService = inject(DelitoService);
  private tipoDelitoService = inject(TipoDelitoService);

  tipoDelitos = signal<TipoDelito[]>([]);
  

  ngOnInit() {
    this.delitoService.eventFormComponent.emit(this);
    this.delitoService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });

    this.getAllTipoDelitos();

  };

  delito!: Delito; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formDelito: FormGroup = this.formBuilder.group({
    id: [],
    descripcion: [ , [Validators.required]],
    idTipoDelito:[ , [Validators.required]],
  });

  getAllTipoDelitos(){
    this.tipoDelitoService.getAll().subscribe({
      next: (res) => { 
        this.tipoDelitos.set(res);
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  }

  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nuevo Delito";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Delito";
    this.delitoService.getById(id).subscribe({
      next: (res) => {
        this.delito = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  saveDelito() {
    this.isLoading = true;
    if (this.formDelito.valid) {
      if(this.delito.id){
        this.submitUpdate(this.delito.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formDelito.reset();
    this.delito = new Delito;
    
  };

  submitCreate() {
    const data: Delito = {
      ...this.formDelito.value,
    };
    this.delitoService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `El delito ${res.descripcion} ha sido creada.`, 3000);
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
    const data: Delito = {
      ...this.formDelito.value,
    };
    this.delitoService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedDelito.set( res );
          this.helpersService.messageNotification("success", "Correcto", `El delito  ${res.descripcion} ha sido actualizada.`, 3000);
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
