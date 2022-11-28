import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorAsistenciasPageRoutingModule } from './profesor-asistencias-routing.module';

import { ProfesorAsistenciasPage } from './profesor-asistencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorAsistenciasPageRoutingModule
  ],
  declarations: [ProfesorAsistenciasPage]
})
export class ProfesorAsistenciasPageModule {}
