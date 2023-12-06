import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { Perfil } from '@core/models/Perfil';
import { PerfilService } from '../../services/perfil.service';
import { HelpersService } from '@core/services/helpers.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {
  @Output() rowSelected = new EventEmitter<Perfil>();

  private perfilService = inject(PerfilService);
  private helpersService = inject(HelpersService);

  perfiles = signal<Perfil[]>([]);
  selectedPerfil = signal<Perfil>(new Perfil);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  ngOnInit() {
    this.perfilService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.perfilService.getAll().subscribe({
      next: (res) => { 
        this.perfiles.set(res);
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
    this.selectedPerfil.set(event.data);
    this.rowSelected.emit(this.selectedPerfil());
  }

  onRowUnselect() {
    this.selectedPerfil.set(new Perfil);
    this.rowSelected.emit(this.selectedPerfil());
  }
}
