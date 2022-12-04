import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  public email = '';

  constructor(private alertController: AlertController, private http: HttpClient) { }

  ngOnInit() {
  }

  async sendRequest(){
    if(!this.email) {
      return this.showAlert('Por favor, escribe tu correo');
    }

    const query = `?email=${this.email}`;

    await this.http.get('https://mattia.pythonanywhere.com/reset_password' + query).toPromise();

    this.showAlert('Si existe un usuario con esa mail, recibirà un link para restablecer la password de la cuenta');
  }



  async showAlert(txt) {
    const alert = await this.alertController.create({
      header: txt,
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
