import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpersService } from '@core/services/helpers.service';
import { Rorechazo } from '@core/models/Rorechazo';
import { RechzoService } from './services/rechzo.service';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { RechzoModule } from './rechzo.module';

@Component({
  selector: 'app-rechzo',
  standalone: true,
  imports: [RechzoModule,ToolbarComponent, ModaldeleteComponent],
  templateUrl: './rechzo.component.html',
  styles: [
  ],
  providers: [ HelpersService]
})
export class RechzoComponent {
  rechzoService = inject(RechzoService);

  rechzo = signal(new Rorechazo);   

  ngOnInit(): void {
    this.rechzo.set(new Rorechazo);
  }

  setObject( rechzo: Rorechazo  ) {
    this.rechzo.set(rechzo);
  }
}
