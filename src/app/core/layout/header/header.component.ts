import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeComponentsModule } from 'src/app/shared/prime-components/prime-components.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule, PrimeComponentsModule],
  standalone: true,
})
export class HeaderComponent {
    constructor(private router: Router) {}
  
    items: { label: string, icon: string, items: any, routerLink: string[], routerLinkActive: string }[] = [] ;
    itemsBase: { label: string, icon: string, items: any, routerLink: string[], routerLinkActive: string }[] = [
        {
            label: 'Personas',
            icon: 'pi pi-user',
            items: [
                // {
                //     label: 'Nuevo',
                //     icon: 'pi pi-fw pi-plus',
                // },
                // {
                //     label: 'Editar',
                //     icon: 'pi pi-fw pi-pencil',
                // },
                // {
                //     separator: true
                // },
                // {
                //     label: 'Borrar',
                //     icon: 'pi pi-fw pi-trash'
                // }
            ],
            routerLink: ['/people'],
            routerLinkActive: 'active'
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-user',
            items: [],
            routerLink: ['/users'],
            routerLinkActive: 'active'
        },
        {
            label: 'Cargos',
            icon: 'pi pi-user',
            items: [],
            routerLink: ['/cargo'],
            routerLinkActive: 'active'
        },
        {
            label: 'Funcionarios',
            icon: 'pi pi-user',
            items: [],
            routerLink: ['/funcionarios'],
            routerLinkActive: 'active'
        },
        {
            label: 'Unidad',
            icon: 'pi pi-apple',
            items: [
                {
                    label: 'Unidad 2',
                    icon: 'pi pi-check',
                    items: [],
                    routerLink: ['/unidades'],
                    routerLinkActive: 'active'
                }
            ],
            routerLink: ['/unidades'],
            routerLinkActive: 'active'
        },
        {
            label: 'Instructivos',
            icon: 'pi pi-user',
            items: [],
            routerLink: ['/instructivos'],
            routerLinkActive: 'active'
        },
        {
            label: 'Tipo Objecion',
            icon: 'pi pi-book',
            items: [
                {
                    label: 'Sobreseimiento',
                    icon: 'pi pi-check',
                    items: [],
                    routerLink: ['/sobreseimientos'],
                    routerLinkActive: 'active'
                },
                {
                    label: 'Rechazo',
                    icon: 'pi pi-times-circle',
                    items: [],
                    routerLink: ['/rechzos'],
                    routerLinkActive: 'active'
                },
                {
                    label: 'Desestimacion',
                    icon: 'pi pi-arrow-circle-down',
                    items: [],
                    routerLink: ['/desestimaciones'],
                    routerLinkActive: 'active'
                }
            ],
            routerLink: ['/tipoobjeciones'],
            routerLinkActive: 'active'
        },{
            label: 'Usuario Perfil',
            icon: 'pi pi-user',
            items: [],
            routerLink: ['/usuarioperfiles'],
            routerLinkActive: 'active'
        },
        {
            label: 'Perfil',
            icon: 'pi pi-book',
            items: [],
            routerLink: ['/perfiles'],
            routerLinkActive: 'active'
        },
        {
            label: 'TipoDelito',
            icon: 'pi pi-book',
            items: [],
            routerLink: ['/tipoDelitos'],
            routerLinkActive: 'active'
        },
        {
            label: 'Delito',
            icon: 'pi pi-book',
            items: [],
            routerLink: ['/delitos'],
            routerLinkActive: 'active'
        },
    ] ;

    ngOnInit() {
        this.items = this.itemsBase;
    }

    filterHeader( event: any ) {
        this.items = [];
        for (let item of this.itemsBase) {
            if ( item.label.toLowerCase().indexOf( event.target.value.toLowerCase() ) > -1 ) {
                this.items.push(item);
            }
        }
    }
}

