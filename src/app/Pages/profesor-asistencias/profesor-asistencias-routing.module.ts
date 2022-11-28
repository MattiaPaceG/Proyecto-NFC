import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorAsistenciasPage } from './profesor-asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorAsistenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorAsistenciasPageRoutingModule {}
