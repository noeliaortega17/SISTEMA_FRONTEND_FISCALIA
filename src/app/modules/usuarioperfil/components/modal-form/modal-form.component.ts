import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { UsuarioPerfilService } from '../../services/usuarioperfil.service';
import { Userprofile } from '@core/models/Userprofile';
import { TableComponent } from '../table/table.component';
import { UsuarioService } from 'src/app/modules/usuario/services/usuario.service';
import { User } from '@core/models/User';
import { PerfilService } from 'src/app/modules/perfil/services/perfil.service';
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
  private userprofileService = inject(UsuarioPerfilService);
  private userService = inject(UsuarioService);
  private profileService = inject(PerfilService);
  
  userprofile!: Userprofile; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  users = signal<User[]>([]);
  profiles = signal<Perfil[]>([]);

  ngOnInit() {
    this.userprofileService.eventFormComponent.emit(this);
    this.userprofileService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });

    this.getAllUsers();
    this.getAllProfiles();
  };


  public formUserprofile: FormGroup = this.formBuilder.group({
    id: [],
    idUsuario: [ , Validators.required,],
    idPerfil: [ , Validators.required,],
  });

  getAllUsers() {
    this.userService.getAll().subscribe({
      next: (res) => { 
        this.users.set(res);
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  }
  
  getAllProfiles() {
    this.profileService.getAll().subscribe({
      next: (res) => { 
        this.profiles.set(res);
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
    this.tittleForm = "Nuevo Usuario Perfil";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Usuario Perfil";
    this.userprofileService.getById(id).subscribe({
      next: (res) => {
        this.userprofile = res;
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
    if (this.formUserprofile.valid) {
      if(this.userprofile.id){
        this.submitUpdate(this.userprofile.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formUserprofile.reset();
    this.userprofile = new Userprofile;
    
  };

  submitCreate() {
    const data: Userprofile = {
      ...this.formUserprofile.value,
    };
    this.userprofileService.create(data).subscribe({
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
    const data: Userprofile = {
      ...this.formUserprofile.value,
    };
    this.userprofileService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedUsuarioperfil.set( res );
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
