import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { TipoDelito } from '@core/models/TipoDelito';
import { TipoDelitoService } from '../../services/tipodelito.service';
import { HelpersService } from '@core/services/helpers.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html', 
  styles: [
  ]
})
export class TableComponent {
  @Output() rowSelected = new EventEmitter<TipoDelito>();

  private tipoDelitoService = inject(TipoDelitoService);
  private helpersService = inject(HelpersService);

  tipoDelitos = signal<TipoDelito[]>([]);
  selectedTipoDelito = signal<TipoDelito>(new TipoDelito);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  ngOnInit() {
    this.tipoDelitoService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.tipoDelitoService.getAll().subscribe({
      next: (res) => { 
        this.tipoDelitos.set(res);
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
    this.selectedTipoDelito.set(event.data);
    this.rowSelected.emit(this.selectedTipoDelito());
  }

  onRowUnselect() {
    this.selectedTipoDelito.set(new TipoDelito);
    this.rowSelected.emit(this.selectedTipoDelito());
  }

}
