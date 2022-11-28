import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private alertController:AlertController) { }

  ngOnInit() {
  }

 login = {};
 handlerMessage = '';
 roleMessage = ''

 async showLoginFailedAlert() {
  const alert = await this.alertController.create({
    header: 'Error! Password or email not correct',
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


  Login(){
    var email= this.login["email"];
    var pass= this.login["pass"];

    if (pass == "1234"){
      switch(email){

        case "estudiante":
          this.router.navigate(['/estudiante-home'])
          break;

        case "profesor":
          this.router.navigate(['/profesor-home'])
          break;

        case "admin":
          this.router.navigate(['/admin-home'])
          break;
        
        default:
          this.showLoginFailedAlert();
      }
    }
    else this.showLoginFailedAlert();
  }
}
