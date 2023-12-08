import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { RegistroObjecion } from '@core/models/RegistroObjecion';
import { HelpersService } from '@core/services/helpers.service';
import { RegistroObjecionService } from '../../services/registroobjecion.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {
  @Output() rowSelected = new EventEmitter<RegistroObjecion>();

  private registroobjecionService = inject(RegistroObjecionService);
  private helpersService = inject(HelpersService);

  registroobjeciones = signal<RegistroObjecion[]>([]);
  selectedRegistroobjecion = signal<RegistroObjecion>(new RegistroObjecion);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  ngOnInit() {
    this.registroobjecionService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.registroobjecionService.getAll().subscribe({
      next: (res) => { 
        this.registroobjeciones.set(res);
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
    this.selectedRegistroobjecion.set(event.data);
    this.rowSelected.emit(this.selectedRegistroobjecion());
  }

  onRowUnselect() {
    this.selectedRegistroobjecion.set(new RegistroObjecion);
    this.rowSelected.emit(this.selectedRegistroobjecion());
  }
}
