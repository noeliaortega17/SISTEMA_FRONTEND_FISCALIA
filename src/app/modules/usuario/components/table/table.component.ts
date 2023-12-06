import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { User } from '@core/models/User';
import { UsuarioService } from '../../services/usuario.service';
import { HelpersService } from '@core/services/helpers.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {

  @Output() rowSelected = new EventEmitter<User>();

  // private enterpriseComponent = inject(EnterprisesComponent); 
  private userService = inject(UsuarioService);
  private helpersService = inject(HelpersService);

  users = signal<User[]>([]);
  selectedUser = signal<User>(new User);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  formComponent!: ModalFormComponent; // esto no esta en el ejemplo funcionario 

  ngOnInit() {
    this.userService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.userService.getAll().subscribe({
      next: (res) => { 
        this.users.set(res);
        this.loading.set(false);
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
  }

  reload (): void {    
    this.getAll();
    this.firstPage = 0;
  } 
  
  onRowSelect(event: any) {
    this.selectedUser.set(event.data);
    this.rowSelected.emit(this.selectedUser());
  }

  onRowUnselect() {
    this.selectedUser.set(new User);
    this.rowSelected.emit(this.selectedUser());
  }   

}
