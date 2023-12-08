import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { Instructivo } from '@core/models/Instructivo';
import { InstructivoService } from '../../services/instructivo.service';
import { HelpersService } from '@core/services/helpers.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {

  
  @Output() rowSelected = new EventEmitter<Instructivo>();

  private instructivoService = inject(InstructivoService);
  private helpersService = inject(HelpersService);

  instructivos = signal<Instructivo[]>([]);
  selectedInstructivo = signal<Instructivo>(new Instructivo);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);


  ngOnInit() {
    this.instructivoService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.instructivoService.getAll().subscribe({
      next: (res) => { 
        this.instructivos.set(res);
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
    this.selectedInstructivo.set(event.data);
    this.rowSelected.emit(this.selectedInstructivo());
  }

  onRowUnselect() {
    this.selectedInstructivo.set(new Instructivo);
    this.rowSelected.emit(this.selectedInstructivo());
  }  

  donwloadPdf( base64: string ) {
    this.instructivoService.descargarPdf(base64, 'aaa.pdf');
  }

}
