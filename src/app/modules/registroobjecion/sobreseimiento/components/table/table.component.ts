import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { HelpersService } from '@core/services/helpers.service';
import { Table } from 'primeng/table';
import { SobreseimientoService } from '../../services/sobreseimiento.service';
import { Rosobreseimiento } from '@core/models/Rosobreseimiento';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {
  @Output() rowSelected = new EventEmitter<Rosobreseimiento>();

  private sobreseimientoService = inject(SobreseimientoService);
  private helpersService = inject(HelpersService);

  sobreseimientos = signal<Rosobreseimiento[]>([]);
  selectedSobreseimiento = signal<Rosobreseimiento>(new Rosobreseimiento);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  ngOnInit() {
    this.sobreseimientoService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.sobreseimientoService.getAll().subscribe({
      next: (res) => { 
        this.sobreseimientos.set(res);
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
    this.selectedSobreseimiento.set(event.data);
    this.rowSelected.emit(this.selectedSobreseimiento());
  }

  onRowUnselect() {
    this.selectedSobreseimiento.set(new Rosobreseimiento);
    this.rowSelected.emit(this.selectedSobreseimiento());
  }
}
