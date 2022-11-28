import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorAsistenciaNfcPageRoutingModule } from './profesor-asistencia-nfc-routing.module';

import { ProfesorAsistenciaNfcPage } from './profesor-asistencia-nfc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorAsistenciaNfcPageRoutingModule
  ],
  declarations: [ProfesorAsistenciaNfcPage]
})
export class ProfesorAsistenciaNfcPageModule {}
