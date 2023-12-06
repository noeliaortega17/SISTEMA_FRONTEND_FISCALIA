import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { Rodesestimacion } from '@core/models/Rodesestimacion';
import { HelpersService } from '@core/services/helpers.service';
import { Table } from 'primeng/table';
import { DesestimacionService } from '../../services/desestimacion.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {
  @Output() rowSelected = new EventEmitter<Rodesestimacion>();

  private desestimacionService = inject(DesestimacionService);
  private helpersService = inject(HelpersService);

  desestimaciones = signal<Rodesestimacion[]>([]);
  selectedDesestimacion = signal<Rodesestimacion>(new Rodesestimacion);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  ngOnInit() {
    this.desestimacionService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.desestimacionService.getAll().subscribe({
      next: (res) => { 
        this.desestimaciones.set(res);
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
    this.selectedDesestimacion.set(event.data);
    this.rowSelected.emit(this.selectedDesestimacion());
  }

  onRowUnselect() {
    this.selectedDesestimacion.set(new Rodesestimacion);
    this.rowSelected.emit(this.selectedDesestimacion());
  }
}
