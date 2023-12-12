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
                    label: 'Usuarios',
                    icon: 'pi pi-user',
                    items: [],
                    routerLink: ['/users'],
                    routerLinkActive: 'active'
                },
                {
                    label: 'Funcionarios',
                    icon: 'pi pi-id-card',
                    items: [],
                    routerLink: ['/funcionarios'],
                    routerLinkActive: 'active'
                },
                {
                    label: 'Personas',
                    icon: 'pi pi-users',
                    items: [],
                    routerLink: ['/people'],
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
                    label: 'Unidades',
                    icon: 'pi pi-sitemap',
                    items: [],
                    routerLink: ['/unidades'],
                    routerLinkActive: 'active'
                },
               // {
            //   label: 'Usuario Perfil',
               // icon: 'pi pi-user-edit',
                //    items: [],
                //    routerLink: ['/usuarioperfiles'],
                //    routerLinkActive: 'active'
                //},
                {
                    label: 'Perfiles',
                    icon: 'pi pi-id-card',
                    items: [],
                    routerLink: ['/perfiles'],
                    routerLinkActive: 'active'
                },
            ],
            routerLink: ['/users'],
            routerLinkActive: 'active'
        },
        {
            label: 'Instructivos',
            icon: 'pi pi-book',
            items: [],
            routerLink: ['/instructivos'],
            routerLinkActive: 'active'
        },      
        {
            label: 'Cuadernos Desarchivados',
            icon: 'pi pi-book',
            items: [
                {
                    label: 'Tipos de Delito',
                    icon: 'pi pi-book',
                    items: [],
                    routerLink: ['/tipoDelitos'],
                    routerLinkActive: 'active'
                },
                {
                    label: 'Delitos',
                    icon: 'pi pi-book',
                    items: [],
                    routerLink: ['/delitos'],
                    routerLinkActive: 'active'
                },
                {
                    label: 'Desarchivos',
                    icon: 'pi pi-book',
                    items: [],
                    routerLink: ['/desarchivos'],
                    routerLinkActive: 'active'
                },
            ],
            routerLink: ['/desarchivos'],
            routerLinkActive: 'active'
        },
        {
            label: 'Resoluciones Jerárquicas',
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
            routerLink: ['/registroobjeciones'],
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

