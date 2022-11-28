import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { NFC } from '@awesome-cordova-plugins/nfc/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Attendee } from '../../models/attendee';

@Component({
  selector: 'app-profesor-asistencia-nfc',
  templateUrl: './profesor-asistencia-nfc.page.html',
  styleUrls: ['./profesor-asistencia-nfc.page.scss'],
})

export class ProfesorAsistenciaNfcPage implements OnInit, OnDestroy {
  @Input() attendance: Attendee[] = [];
  nfc$: Subscription;

  constructor(
    private nfc: NFC,
    private toastController: ToastController,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.nfc$ = this.nfc.addNdefListener().subscribe(
      data => this.updateAttendance(String.fromCharCode(...data.tag.ndefMessage[0].payload)) ,
      err => console.log('Error reading tag', err)
    );
  }

  ngOnDestroy() {
    this.nfc$.unsubscribe();
  }

  updateAttendance(name: string) {
    this.attendance = [...this.attendance, new Attendee(name, new Date())].slice();
    this.cdr.detectChanges();
    this.toastController.create({
      message: `¡${name} presente!`,
      duration: 1500,
      icon: 'checkmark',
      color: 'success'
    })
    .then(toast => toast.present())
    .catch(err => console.error(err));
  }

  handleClear() {
    this.alertController.create({
      header: 'Reiniciar lista',
      message: '¿Realmente desea vaciar la lista de asistencia?',
      buttons: [
        {
          text: 'Reiniciar',
          handler: () => this.clearList(),
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    })
    .then(alert => alert.present())
    .catch(err => console.error(err));
  }

  clearList() {
    this.attendance = [];
    this.cdr.detectChanges();
    this.toastController.create({
      message: `¡La lista ha sido reiniciada!`,
      duration: 1500,
      icon: 'reload',
      color: 'success'
    })
    .then(toast => toast.present())
    .catch(err => console.error(err));
  }

}