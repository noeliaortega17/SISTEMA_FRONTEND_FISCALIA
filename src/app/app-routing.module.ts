import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from '@person/persona.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login.component').then(c => c.LoginComponent)
    
  },
  {
    path: 'people',
    loadComponent: () => import('./modules/persona/persona.component').then(c => c.PersonaComponent)
    
  },
  {
    path: 'users',
    loadComponent: () => import('./modules/usuario/usuario.component').then(c => c.UsuarioComponent)
    
  },
  {
    path: 'cargo',
    loadComponent: () => import('./modules/cargo/cargo.component').then(c => c.CargoComponent)
    
  },
  {
    path: 'unidades',
    loadComponent: () => import('./modules/unidad/unidad.component').then(c => c.UnidadComponent)
    
  },
  {
    path: 'funcionarios',
    loadComponent: () => import('./modules/funcionario/funcionario.component').then(c => c.FuncionarioComponent)
    
  },
  {
    path: 'instructivos',
    loadComponent: () => import('./modules/instructivo/instructivo.component').then(c => c.InstructivoComponent)
    
  },
  {
    path: 'tipoobjeciones',
    loadComponent: () => import('./modules/tipoobjecion/tipoobjecion.component').then(c => c.TipoobjecionComponent)
    
  },
  {
    path: 'usuarioperfiles',
    loadComponent: () => import('./modules/usuarioperfil/usuarioperfil.component').then(c => c.UsuarioperfilComponent)
    
  },
  {
    path: 'perfiles',
    loadComponent: () => import('./modules/perfil/perfil.component').then(c => c.PerfilComponent)
    
  },
  {
    path: 'tipoDelitos',
    loadComponent: () => import('./modules/tipodelito/tipodelito.component').then(c => c.TipodelitoComponent)
    
  },
  {
    path: 'delitos',
    loadComponent: () => import('./modules/delito/delito.component').then(c => c.DelitoComponent)
    
  },
  {
    path: 'registroobjeciones',
    loadComponent: () => import('./modules/registroobjecion/registroobjecion.component').then(c => c.RegistroobjecionComponent)
    
  },
  {
    path: 'desarchivos',
    loadComponent: () => import('./modules/desarchivo/desarchivo.component').then(c => c.DesarchivoComponent)
    
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () => import('./shared/components/nout-found/nout-found.component').then(c => c.NoutFoundComponent)
  }  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }