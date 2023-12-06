import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from '@person/persona.component';

const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
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
    path: 'tipoobjeciones',
    loadComponent: () => import('./modules/tipoobjecion/tipoobjecion.component').then(c => c.TipoobjecionComponent)
    
  },
  {
    path: 'usuarioperfiles',
    loadComponent: () => import('./modules/usuarioperfil/usuarioperfil.component').then(c => c.UsuarioperfilComponent)
    
  },
  {
    path: 'desestimaciones',
    loadComponent: () => import('./modules/registroobjecion/desestimacion/desestimacion.component').then(c => c.DesestimacionComponent)
    
  },
  {
    path: 'rechzos',
    loadComponent: () => import('./modules/registroobjecion/rechzo/rechzo.component').then(c => c.RechzoComponent)
    
  },
  {
    path: 'sobreseimientos',
    loadComponent: () => import('./modules/registroobjecion/sobreseimiento/sobreseimiento.component').then(c => c.SobreseimientoComponent)
    
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