import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeComponentsModule } from 'src/app/shared/prime-components/prime-components.module';
import { LoginService } from '@core/services/login.service';
import { LocalStorageService } from '@core/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule, PrimeComponentsModule],
  standalone: true,
})
export class HeaderComponent {
    constructor(private router: Router) {}

    loginService = inject(LoginService);
    localStorageService = inject(LocalStorageService);
  
    items: { label: string, icon: string, items: any, routerLink: string[], routerLinkActive: string }[] = [];
    itemsBase: { label: string, icon: string, items: any, routerLink: string[], routerLinkActive: string }[] = [
        
        {
            label: 'Gestión de Usuarios',
            icon: 'pi pi-users',
            items: [
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
                    icon: 'pi pi-id-card',
                    items: [],
                    routerLink: ['/users'],
                    routerLinkActive: 'active'
                },
                {
                    label: 'Cargos',
                    icon: 'pi pi-briefcase',
                    items: [],
                    routerLink: ['/cargo'],
                    routerLinkActive: 'active'
                },
                {
                    label: 'Funcionarios',
                    icon: 'pi pi-user-plus',
                    items: [],
                    routerLink: ['/funcionarios'],
                    routerLinkActive: 'active'
                },
                {
                    label: 'Unidad',
                    icon: 'pi pi-th-large',
                    items: [],
                    routerLink: ['/unidades'],
                    routerLinkActive: 'active'
                },
                {
                    label: 'Usuario Perfil',
                    icon: 'pi pi-user-edit',
                    items: [],
                    routerLink: ['/usuarioperfiles'],
                    routerLinkActive: 'active'
                },
                {
                    label: 'Perfil',
                    icon: 'pi pi-id-card',
                    items: [],
                    routerLink: ['/perfiles'],
                    routerLinkActive: 'active'
                },
            ],
            routerLink: [],
            routerLinkActive: 'active'
        },
        {
            label: 'Gestión de Cuaderno Desarchivados',
            icon: 'pi pi-book',
            items: [
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
            ],
            routerLink: [],
            routerLinkActive: 'active'
        },
        {
            label: 'Gestión de Instructivos',
            icon: 'pi pi-book',
            items: [
                {
                    label: 'Instructivos',
                    icon: 'pi pi-book',
                    items: [],
                    routerLink: ['/instructivos'],
                    routerLinkActive: 'active'
                },
            ],
            routerLink: [],
            routerLinkActive: 'active'
        },
        {
            label: 'Gestión de Resoluciones Jerarquicas',
            icon: 'pi pi-book',
            items: [
                {
                    label: 'Tipo Objecion',
                    icon: 'pi pi-book',
                    items: [],
                    routerLink: ['/tipoobjeciones'],
                    routerLinkActive: 'active'
                },
                {
                    label: 'Registro Objecion',
                    icon: 'pi pi-book',
                    items: [],
                    routerLink: ['/registroobjeciones'],
                    routerLinkActive: 'active'
                },
            ],
            routerLink: [],
            routerLinkActive: 'active'
        },
        
    ] ;

    itemsLogin: { label: string, icon: string, routerLink: string[], routerLinkActive: string }[] = [
        { label: 'Logout', icon: 'pi pi-external-link', routerLink: ['/'], routerLinkActive: '' }
    ];

    redirectLogin() {
        this.router.navigate(['/'])
    }

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

