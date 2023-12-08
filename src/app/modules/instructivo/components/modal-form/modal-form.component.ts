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

  
  instructivo!: Instructivo; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formInstructivo: FormGroup = this.formBuilder.group({
    id: [],
    cite: [, Validators.required,],
    descripcion: [, [Validators.required]],
    fiscaliaGeneral: [, [Validators.required]],
    fechaInstructivo: [, Validators.required,],
    pdf: [],
  });


  uploadedFile: string = '';


    // async onUpload(event:any) {
    //   console.log(event);
    //     try {
    //       const base64String = await this.convertirBlobABase64(event.currentFiles[0]);
    //       console.log(base64String);
    //       this.uploadedFile = base64String;
    //       // Aquí puedes hacer lo que necesites con la cadena Base64, como enviarla a un servidor, mostrarla en la interfaz, etc.
    //     } catch (error) {
    //       console.error('Error al convertir Blob a Base64:', error);
    //     }
      
        // for(let file of event.files) {
        //     this.uploadedFiles.push(file);
        // }
      // }
      

      async onUpload(event: any): Promise<void> {
        console.log(event);
        
        const archivo = event.currentFiles[0];
    
        if (archivo) {
          try {
            let base64 = archivo.readAsDataURL();
            console.log(base64);
            this.uploadedFile = base64;
          } catch (error) {
            console.error('Error al convertir archivo a Base64:', error);
          }
        }
      }
  
    // Ejemplo de uso (asumiendo que tienes un Blob llamado 'blobPdf')








 
  ngOnInit() {
    this.instructivoService.eventFormComponent.emit(this);
    this.instructivoService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  };

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
    data.pdf = this.uploadedFile;
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
