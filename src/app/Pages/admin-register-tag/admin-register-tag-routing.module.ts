import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRegisterTagPage } from './admin-register-tag.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRegisterTagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRegisterTagPageRoutingModule {}
