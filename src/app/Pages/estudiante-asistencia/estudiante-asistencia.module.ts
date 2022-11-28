import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudianteAsistenciaPageRoutingModule } from './estudiante-asistencia-routing.module';

import { EstudianteAsistenciaPage } from './estudiante-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudianteAsistenciaPageRoutingModule
  ],
  declarations: [EstudianteAsistenciaPage]
})
export class EstudianteAsistenciaPageModule {}
