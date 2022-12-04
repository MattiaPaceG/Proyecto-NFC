import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    loadChildren: () => import('./Pages/start/start.module').then( m => m.StartPageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'register',
    loadChildren: () => import('./Pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./Pages/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'estudiante-home',
    loadChildren: () => import('./Pages/estudiante-home/estudiante-home.module').then( m => m.EstudianteHomePageModule)
  },
  {
    path: 'profesor-home',
    loadChildren: () => import('./Pages/profesor-home/profesor-home.module').then( m => m.ProfesorHomePageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./Pages/admin-home/admin-home.module').then( m => m.AdminHomePageModule)
  },
  {
    path: 'profesor-asignaturas',
    loadChildren: () => import('./Pages/profesor-asignaturas/profesor-asignaturas.module').then( m => m.ProfesorAsignaturasPageModule)
  },
  {
    path: 'profesor-asistencias',
    loadChildren: () => import('./Pages/profesor-asistencias/profesor-asistencias.module').then( m => m.ProfesorAsistenciasPageModule)
  },
  {
    path: 'estudiante-asistencia',
    loadChildren: () => import('./Pages/estudiante-asistencia/estudiante-asistencia.module').then( m => m.EstudianteAsistenciaPageModule)
  },
  {
    path: 'admin-register-tag',
    loadChildren: () => import('./Pages/admin-register-tag/admin-register-tag.module').then( m => m.AdminRegisterTagPageModule)
  },
  {
    path: 'profesor-asistencia-nfc',
    loadChildren: () => import('./Pages/profesor-asistencia-nfc/profesor-asistencia-nfc.module').then( m => m.ProfesorAsistenciaNfcPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
