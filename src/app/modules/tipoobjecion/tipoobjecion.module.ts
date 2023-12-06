import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';



@NgModule({
  declarations: [
    TableComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    PrimeComponentsModule
  ],
  exports:[
    TableComponent,
    ModalFormComponent,
    PrimeComponentsModule
  ]
})
export class TipoobjecionModule { }
