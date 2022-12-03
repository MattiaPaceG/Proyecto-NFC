import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private alertController:AlertController, private http: HttpClient) { }

  ngOnInit() {
  }

 login = {};
 handlerMessage = '';
 roleMessage = ''
 data: String = '';

 async showLoginFailedAlert() {
  const alert = await this.alertController.create({
    header: 'Error! Email o Password no correctos',
    buttons: [
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.handlerMessage = 'Alert confirmed';
        },
      },
    ],
  });

  await alert.present();
  const { role } = await alert.onDidDismiss();
  this.roleMessage = `Dismissed with role: ${role}`;
}


  async Login(){
    var email= this.login["email"];
    var pass= this.login["pass"];

    var query= '?email='+email+'&password='+pass;

    var response= await this.http.get('https://Mattia.pythonanywhere.com/login'+query).toPromise()
    this.data = response.toString();

    if (this.data != "DENIED"){

      switch(this.data){

        case "Estudiante":
          this.router.navigate(['/estudiante-home'])
          break;

        case "Profesor":
          this.router.navigate(['/profesor-home'])
          break;

        case "Admin":
          this.router.navigate(['/admin-home'])
          break;
        
        default:
          this.showLoginFailedAlert();
      }
    }
    else this.showLoginFailedAlert();
  }
}
