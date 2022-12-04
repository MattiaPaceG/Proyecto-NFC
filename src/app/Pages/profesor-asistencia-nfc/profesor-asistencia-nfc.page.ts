import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { NFC } from '@awesome-cordova-plugins/nfc/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { encode } from 'js-base64';
import md5 from 'js-md5';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/student';
import { Attendee } from '../../models/attendee';

@Component({
  selector: 'app-profesor-asistencia-nfc',
  templateUrl: './profesor-asistencia-nfc.page.html',
  styleUrls: ['./profesor-asistencia-nfc.page.scss'],
})

export class ProfesorAsistenciaNfcPage implements OnInit, OnDestroy {
  @Input() attendance: Attendee[] = [];
  public students: Student[] = [];
  private nfc$: Subscription;
  private loader: HTMLIonLoadingElement;

  constructor(
    private nfc: NFC,
    private toastController: ToastController,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadingController.create()
    .then(loader => this.loader = loader)
    .then(() => this.loader.present())
    .then(() => this.http.get('https://asistencia-upn43.ondigitalocean.app/api/estudiantes/all').toPromise())
    .then(response => (response as any[]).map(data => Student.fromJSON(data)))
    .then(students => this.students = students)
    .catch(err => console.error(err))
    .finally(() => this.loader?.dismiss());

    this.nfc$ = this.nfc.addNdefListener().subscribe(
      data => this.updateAttendance(String.fromCharCode(...data.tag.ndefMessage[0].payload).slice(3)) ,
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

  updateAttendance(hash: string) {
    const student = this.students.find(s => hash === md5(encode(`${s.identification}@${s.id}`)));

    if(!student) {
      return this.toastController.create({
        message: 'No está en la lista',
        duration: 1500,
        icon: 'warning',
        color: 'warning'
      })
      .then(toast => toast.present())
      .catch(err => console.error(err));
    }

    this.attendance = [...this.attendance, new Attendee(student.name, student.identification, new Date())].slice();
    this.cdr.detectChanges();
    this.toastController.create({
      message: `¡${student.name} presente!`,
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
