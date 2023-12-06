import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { Delito } from '@core/models/Delito';
import { HelpersService } from '@core/services/helpers.service';
import { Table } from 'primeng/table';
import { DelitoService } from '../../services/delito.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ] 
})
export class TableComponent {
  @Output() rowSelected = new EventEmitter<Delito>();

  private delitoService = inject(DelitoService);
  private helpersService = inject(HelpersService);

  delitos = signal<Delito[]>([]);
  selectedDelito = signal<Delito>(new Delito);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  ngOnInit() {
    this.delitoService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.delitoService.getAll().subscribe({
      next: (res) => { 
        this.delitos.set(res);
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
    this.selectedDelito.set(event.data);
    this.rowSelected.emit(this.selectedDelito());
  }

  onRowUnselect() {
    this.selectedDelito.set(new Delito);
    this.rowSelected.emit(this.selectedDelito());
  }
}
