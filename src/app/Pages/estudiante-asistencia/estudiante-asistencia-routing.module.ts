import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudianteAsistenciaPage } from './estudiante-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: EstudianteAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteAsistenciaPageRoutingModule {}
