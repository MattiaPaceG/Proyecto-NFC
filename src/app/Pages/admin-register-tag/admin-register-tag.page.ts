import { Component, OnDestroy } from '@angular/core';
import { Ndef, NFC } from '@awesome-cordova-plugins/nfc/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { encode } from 'js-base64';
import md5 from 'js-md5';

@Component({
  selector: 'app-admin-register-tag',
  templateUrl: './admin-register-tag.page.html',
  styleUrls: ['./admin-register-tag.page.scss'],
})
export class AdminRegisterTagPage implements OnDestroy {
  public id = '';
  public identification = '';
  private nfc$: Subscription;

  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async startListening() {
    const toast = await this.toastController.create({
      message: 'Acerca el tag NFC',
      duration: 1500,
      icon: 'radio',
      color: 'primary'
    });

    await toast.present();

    this.nfc$ = this.nfc.addTagDiscoveredListener().subscribe(
      () => this.writeToCard(),
      err => this.onFailed(err)
    );
  }

  ngOnDestroy() {
    this.nfc$.unsubscribe();
  }

  async onFailed(err) {
    console.error('Error reading tag', err);
    const toast = await this.toastController.create({
      message: 'NFC no soportado',
      duration: 1500,
      icon: 'reload',
      color: 'danger'
    });

    await toast.present();
  }

  async writeToCard() {
    try {
      const message = [
        this.ndef.textRecord(md5(encode(`${this.identification}@${this.id}`))),
      ];

      await this.nfc.write(message);

      const toast = await this.toastController.create({
        message: 'Tag actualizado',
        duration: 1500,
        icon: 'checkmark-circle',
        color: 'success'
      });

      await toast.present();
    } catch {
      const alert = await this.alertController.create({
        buttons: [
          {
            text: 'OK',
            role: 'confirm'
          },
        ],
      });

      await alert.present();
    }
  }

}
