import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudianteHomePageRoutingModule } from './estudiante-home-routing.module';

import { EstudianteHomePage } from './estudiante-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudianteHomePageRoutingModule
  ],
  declarations: [EstudianteHomePage]
})
export class EstudianteHomePageModule {}
