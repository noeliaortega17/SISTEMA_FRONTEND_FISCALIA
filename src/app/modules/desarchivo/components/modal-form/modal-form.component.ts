import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { DesarchivoService } from '../../services/desarchivo.service';
import { Desarchivo } from '@core/models/Desarchivo';
import { TableComponent } from '../table/table.component';
import { DelitoService } from 'src/app/modules/delito/services/delito.service';
import { FuncionarioService } from 'src/app/modules/funcionario/services/funcionario.service';
import { Delito } from '@core/models/Delito';
import { Funcionario } from '@core/models/Funcionario';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styles: [
  ]
})
export class ModalFormComponent {
  private formBuilder = inject(FormBuilder);
  private helpersService = inject(HelpersService);
  private desarchivoService = inject(DesarchivoService);
  private delitoService = inject(DelitoService);
  private funcionarioService = inject(FuncionarioService);

  delitos = signal<Delito[]>([]);
  funcionarios = signal<Funcionario[]>([]);

  ngOnInit() {
    this.desarchivoService.eventFormComponent.emit(this);
    this.desarchivoService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
    
    this.getAllDelitos();
    this.getAllFuncionarios();

  };

  desarchivo!: Desarchivo; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formDesarchivo: FormGroup = this.formBuilder.group({
    id: [],
    cud: [ , [Validators.required]],
    motivo: [ , [Validators.required]],
    idDelito: [ , [Validators.required]],
    idFuncionario: [ , [Validators.required]],
    fechaAsignacion: [ , [Validators.required]],
    fechaRecepcion: [ , [Validators.required]],
    fechaDesarchivo: [ , [Validators.required]],

  });

  getAllDelitos() {
    this.delitoService.getAll().subscribe({
      next: (res) => { 
        this.delitos.set(res);
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  }

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


  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nuevo Desarchivo";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Desarchivo";
    this.desarchivoService.getById(id).subscribe({
      next: (res) => {
        this.desarchivo = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  saveDesarchivo() {
    this.isLoading = true;
    if (this.formDesarchivo.valid) {
      if(this.desarchivo.id){
        this.submitUpdate(this.desarchivo.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formDesarchivo.reset();
    this.desarchivo = new Desarchivo;
    
  };

  submitCreate() {
    const data: Desarchivo = {
      ...this.formDesarchivo.value,
    };
    this.desarchivoService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `El desarchivo ${res.id} ha sido creada.`, 3000);
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
    const data: Desarchivo = {
      ...this.formDesarchivo.value,
    };
    this.desarchivoService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedDesarchivo.set( res );
          this.helpersService.messageNotification("success", "Correcto", `El desarchivo  ${res.id} ha sido actualizada.`, 3000);
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
