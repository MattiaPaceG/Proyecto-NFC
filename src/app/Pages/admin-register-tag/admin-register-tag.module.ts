import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRegisterTagPageRoutingModule } from './admin-register-tag-routing.module';

import { AdminRegisterTagPage } from './admin-register-tag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRegisterTagPageRoutingModule
  ],
  declarations: [AdminRegisterTagPage]
})
export class AdminRegisterTagPageModule {}
