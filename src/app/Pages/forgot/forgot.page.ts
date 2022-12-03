import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  constructor(private alertController:AlertController, private http: HttpClient) { }

  ngOnInit() {
  }

  data = {};
  handlerMessage = '';
  roleMessage = ''
  resp: String = '';


  async SendRequest(){

     var email = this.data["email"];
     console.log(email)

     if (email != null && email!= ''){

      var query = "?email="+email

      var response = this.http.get('https://mattia.pythonanywhere.com/reset_password'+query).toPromise()
      this.resp = response.toString()

      this.showAlert('Si existe un usuario con esa mail, recibirà un link para restablecer la password de la cuenta')

     }
     else{
      this.showAlert('Por favor, escribe tu correo')
     }


     

  }



  async showAlert(txt) {
    const alert = await this.alertController.create({
      header: txt,
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

}
