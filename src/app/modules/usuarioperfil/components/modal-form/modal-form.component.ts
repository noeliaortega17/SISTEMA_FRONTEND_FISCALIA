import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { UserprofileService } from '../../services/usuarioperfil.service';
import { Userprofile } from '@core/models/Userprofile';
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
  //private userService = inject(UserService);
  //private profile = inject(ProfileService);
  private userprofileService = inject(UserprofileService);
  

  ngOnInit() {
    this.userprofileService.eventFormComponent.emit(this);
    this.userprofileService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  };

  userprofile!: Userprofile; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formUserprofile: FormGroup = this.formBuilder.group({
    id: [],
    descripcion: [ , Validators.required,],
  });

  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nueva Unidad";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Unidad";
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
        this.helpersService.messageNotification("success", "Correcto", `La unidad ${res.idPerfil} ha sido creada.`, 3000);
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
          this.helpersService.messageNotification("success", "Correcto", `La unidad  ${res.idUsuario} ha sido actualizada.`, 3000);
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
