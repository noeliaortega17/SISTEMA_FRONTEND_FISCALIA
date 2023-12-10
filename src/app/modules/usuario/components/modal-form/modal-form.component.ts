import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '@core/models/User';
import { TableComponent } from '../table/table.component';
import { FuncionarioService } from 'src/app/modules/funcionario/services/funcionario.service';
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
  private userService = inject(UsuarioService);
  private funcionarioService = inject(FuncionarioService);

  funcionarios = signal<Funcionario[]>([]);

  ngOnInit() {
    this.userService.eventFormComponent.emit(this);
    this.userService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });

    this.getAllFuncionarios();
  };

  user!: User; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;


  public formUser: FormGroup = this.formBuilder.group({
    id: [],
    usuario: [, Validators.required,],
    contrasena: [, Validators.required,],
    idFuncionario: [, Validators.required,],
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

  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nuevo Usuario";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Usuario";
    this.userService.getById(id).subscribe({
      next: (res) => {
        this.user = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  saveUser() {
    this.isLoading = true;
    if (this.formUser.valid) {
      if(this.user.id){
        this.submitUpdate(this.user.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formUser.reset();
    this.user = new User;
    
  };

  submitCreate() {
    const data: User = {
      ...this.formUser.value,
    };
    this.userService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `El usuario ${res.id} ha sido creada.`, 3000);
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
    const data: User = {
      ...this.formUser.value,
    };
    this.userService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedUser.set( res );
          this.helpersService.messageNotification("success", "Correcto", `El usuario ${res.id} ha sido actualizada.`, 3000);
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
