import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { Userprofile } from '@core/models/Userprofile';
import { UsuarioPerfilService } from '../../services/usuarioperfil.service';
import { HelpersService } from '@core/services/helpers.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {
  @Output() rowSelected = new EventEmitter<Userprofile>();

  private usuarioperfilService = inject(UsuarioPerfilService);
  private helpersService = inject(HelpersService);

  usuarioperfiles = signal<Userprofile[]>([]);
  selectedUsuarioperfil = signal<Userprofile>(new Userprofile);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  ngOnInit() {
    this.usuarioperfilService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.usuarioperfilService.getAll().subscribe({
      next: (res) => { 
        this.usuarioperfiles.set(res);
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
    this.selectedUsuarioperfil.set(event.data);
    this.rowSelected.emit(this.selectedUsuarioperfil());
  }

  onRowUnselect() {
    this.selectedUsuarioperfil.set(new Userprofile);
    this.rowSelected.emit(this.selectedUsuarioperfil());
  }
}
