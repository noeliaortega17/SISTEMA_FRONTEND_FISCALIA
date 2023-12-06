import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { HelpersService } from '@core/services/helpers.service';
import { Table } from 'primeng/table';
import { RechzoService } from '../../services/rechzo.service';
import { Rorechazo } from '@core/models/Rorechazo';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {
  @Output() rowSelected = new EventEmitter<Rorechazo>();

  private rechzoService = inject(RechzoService);
  private helpersService = inject(HelpersService);

  rechzos = signal<Rorechazo[]>([]);
  selectedRechzo = signal<Rorechazo>(new Rorechazo);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  ngOnInit() {
    this.rechzoService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.rechzoService.getAll().subscribe({
      next: (res) => { 
        this.rechzos.set(res);
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
    this.selectedRechzo.set(event.data);
    this.rowSelected.emit(this.selectedRechzo());
  }

  onRowUnselect() {
    this.selectedRechzo.set(new Rorechazo);
    this.rowSelected.emit(this.selectedRechzo());
  }
}
