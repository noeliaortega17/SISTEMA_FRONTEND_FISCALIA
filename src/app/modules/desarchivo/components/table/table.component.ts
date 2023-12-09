import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { Desarchivo } from '@core/models/Desarchivo';
import { DesarchivoService } from '../../services/desarchivo.service';
import { HelpersService } from '@core/services/helpers.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {
  @Output() rowSelected = new EventEmitter<Desarchivo>();

  private desarchivoService = inject(DesarchivoService);
  private helpersService = inject(HelpersService);

  desarchivos = signal<Desarchivo[]>([]);
  selectedDesarchivo = signal<Desarchivo>(new Desarchivo);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  ngOnInit() {
    this.desarchivoService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.desarchivoService.getAll().subscribe({
      next: (res) => { 
        this.desarchivos.set(res);
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
    this.selectedDesarchivo.set(event.data);
    this.rowSelected.emit(this.selectedDesarchivo());
  }

  onRowUnselect() {
    this.selectedDesarchivo.set(new Desarchivo);
    this.rowSelected.emit(this.selectedDesarchivo());
  }
  
}
