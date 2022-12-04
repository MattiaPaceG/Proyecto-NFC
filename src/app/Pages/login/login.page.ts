import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 public email = '';
 public password = '';

  constructor(private router: Router,
              private alertController: AlertController, 
              private http: HttpClient,
              private loginService : LoginService) { }

  ngOnInit() {
  }

 async showLoginFailedAlert() {
  const alert = await this.alertController.create({
    header: 'Error! Email o Password no correctos',
    buttons: [
      {
        text: 'OK',
        role: 'confirm',
      },
    ],
  });

  await alert.present();
}


  async login() {
    const query = `?email=${this.email}&password=${this.password}`;

    const response = await this.http.get('https://Mattia.pythonanywhere.com/login' + query).toPromise();
    const data = response

    console.log(data['db_id'])

    this.loginService.set_connected_id(data['db_id'])

    switch(data['role']){
      case 'Estudiante': this.router.navigate(['/estudiante-home']); break;
      case 'Profesor': this.router.navigate(['/profesor-home']); break;
      case 'Admin': this.router.navigate(['/admin-home']); break;
      default: this.showLoginFailedAlert();
    }
  }
}
