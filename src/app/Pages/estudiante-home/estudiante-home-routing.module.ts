import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudianteHomePage } from './estudiante-home.page';

const routes: Routes = [
  {
    path: '',
    component: EstudianteHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteHomePageRoutingModule {}
