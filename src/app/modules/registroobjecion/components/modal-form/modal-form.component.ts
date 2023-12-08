import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { RegistroObjecionService } from '../../services/registroobjecion.service';
import { RegistroObjecion } from '@core/models/RegistroObjecion';
import { TableComponent } from '../table/table.component';
import { Funcionario } from '@core/models/Funcionario';
import { Tipoobjecion } from '@core/models/Tipoobjecion';
import { FuncionarioService } from 'src/app/modules/funcionario/services/funcionario.service';
import { TipoobjecionService } from 'src/app/modules/tipoobjecion/services/tipoobjecion.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styles: [
  ]
})
export class ModalFormComponent {
  private formBuilder = inject(FormBuilder);
  private helpersService = inject(HelpersService);
  private registrobjecionService = inject(RegistroObjecionService);
  private funcionarioService = inject(FuncionarioService);
  private tipoobjecionService = inject(TipoobjecionService);
  
  registroobjecion!: RegistroObjecion; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  funcionarios = signal<Funcionario[]>([]);
  tipoobjeciones = signal<Tipoobjecion[]>([]);

  ngOnInit() {
    this.registrobjecionService.eventFormComponent.emit(this);
    this.registrobjecionService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });

    this.getAllFuncionarios();
    this.getAllTipoobjeciones();
  };


  public formRegistroObjecion: FormGroup = this.formBuilder.group({
    id: [],
    idFuncionario: [ , Validators.required,],
    idTipoObjecion: [ , Validators.required,],
    numeroResolucion: [ , Validators.required,],
    cud: [ , Validators.required,]
  });

  getAllFuncionarios() {
    this.funcionarioService.getAll().subscribe({
      next: (res) => { 
        this.funcionarios.set(res);
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  }
  
  getAllTipoobjeciones() {
    this.tipoobjecionService.getAll().subscribe({
      next: (res) => { 
        this.tipoobjeciones.set(res);
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
    this.tittleForm = "Nuevo Registro Objecion";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Registro Objecion";
    this.registrobjecionService.getById(id).subscribe({
      next: (res) => {
        this.registroobjecion = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  saveUnidad() {
    this.isLoading = true;
    if (this.formRegistroObjecion.valid) {
      if(this.registroobjecion.id){
        this.submitUpdate(this.registroobjecion.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formRegistroObjecion.reset();
    this.registroobjecion = new RegistroObjecion;
    
  };

  submitCreate() {
    const data: RegistroObjecion = {
      ...this.formRegistroObjecion.value,
    };
    this.registrobjecionService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `La unidad ${res.id} ha sido creada.`, 3000);
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
    const data: RegistroObjecion = {
      ...this.formRegistroObjecion.value,
    };
    this.registrobjecionService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedRegistroobjecion.set( res );
          this.helpersService.messageNotification("success", "Correcto", `La unidad  ${res.id} ha sido actualizada.`, 3000);
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
