import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public first = '';
  public last = '';
  public email = '';
  public password = '';
  public type = '';

  constructor(private http: HttpClient, private alertController: AlertController, private route: Router) { }

  ngOnInit() {
  }

  async register(){
    if(!this.email || !this.password || !this.first || !this.last) {
      return this.showAlert('Todos los campos son necesarios para registrarse');
    }

    const query = `?email=${this.email}&password=${this.password}&role=${this.type}&first=${this.first}&last=${this.last}`;

    const response = await this.http.get('https://Mattia.pythonanywhere.com/register' + query).toPromise();

    if (response !== '0'){
      return this.showAlert('El e-mail utilizado està ya registrado');
    }

    this.showAlert('El nuevo usuario se ha registrado con exito!');
    this.route.navigate(['/start']);
  }

  async showAlert(txt) {
    const alert = await this.alertController.create({
      header: txt,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
    });

    await alert.present();
  }

  typeChange($event){
    this.type = $event.target.value;
  }

}
