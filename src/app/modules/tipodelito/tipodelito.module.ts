import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { TableComponent } from './components/table/table.component';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModalFormComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    PrimeComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    TableComponent,
    ModalFormComponent,
    PrimeComponentsModule
  ]
})
export class TipodelitoModule { }
