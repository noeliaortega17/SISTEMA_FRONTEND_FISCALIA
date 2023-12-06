import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { Tipoobjecion } from '@core/models/Tipoobjecion';
import { HelpersService } from '@core/services/helpers.service';
import { TipoobjecionService } from '../../services/tipoobjecion.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {
  @Output() rowSelected = new EventEmitter<Tipoobjecion>();

  private tipoobjecioService = inject(TipoobjecionService);
  private helpersService = inject(HelpersService);

  tipoobjeciones = signal<Tipoobjecion[]>([]);
  selectedTipoobjecion = signal<Tipoobjecion>(new Tipoobjecion);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  ngOnInit() {
    this.tipoobjecioService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.tipoobjecioService.getAll().subscribe({
      next: (res) => { 
        this.tipoobjeciones.set(res);
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
    this.selectedTipoobjecion.set(event.data);
    this.rowSelected.emit(this.selectedTipoobjecion());
  }

  onRowUnselect() {
    this.selectedTipoobjecion.set(new Tipoobjecion);
    this.rowSelected.emit(this.selectedTipoobjecion());
  }
}
