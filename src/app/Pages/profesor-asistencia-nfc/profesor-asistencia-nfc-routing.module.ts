import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorAsistenciaNfcPage } from './profesor-asistencia-nfc.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorAsistenciaNfcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorAsistenciaNfcPageRoutingModule {}
