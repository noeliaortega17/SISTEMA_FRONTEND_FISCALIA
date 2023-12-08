import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructivoService } from './services/instructivo.service';
import { Instructivo } from '@core/models/Instructivo';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { InstructivoModule } from './instructivo.module';
import { HelpersService } from '@core/services/helpers.service';

@Component({
  selector: 'app-instructivo',
  standalone: true,
  imports: [CommonModule, InstructivoModule, ToolbarComponent, ModaldeleteComponent],
  templateUrl: './instructivo.component.html',
  styles: [
  ],
  providers: [HelpersService]
})
export class InstructivoComponent {

  instructivoService = inject(InstructivoService);

  instructivo = signal(new Instructivo);   

  ngOnInit(): void {
    
    this.instructivo.set(new Instructivo);
  }

  setObject( instructivo: Instructivo  ) {
    this.instructivo.set(instructivo);
  }

}
