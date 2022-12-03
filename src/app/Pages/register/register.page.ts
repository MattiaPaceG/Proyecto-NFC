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

  constructor(private http: HttpClient, private alertController:AlertController, private route: Router) { }

  ngOnInit() {
  }

  register: any = {}
  results: any = {}
  handlerMessage = '';
  roleMessage = ''
  type = '';


  Register(){
    var email = this.register['email'];
    var password = this.register['pass'];
    var first = this.register['first'];
    var last = this.register['last'];

    if (email != null && password != null && first != null && last != null && this.type!=''){
      console.log(this.type)
      
      var query = '?email='+email+'&password='+password+'&role='+this.type+'&first='+first+'&last='+last

      this.http.get('https://Mattia.pythonanywhere.com/register'+query).subscribe((response) => {
        if (response == 0){
          this.showAlert("El nuevo usuario se ha registrado con exito!")
          this.route.navigate(['/start'])
        }
        else{
          this.showAlert("El e-mail utilizado està ya registrado")
        }
      })

    }
    else{
      this.showAlert("Todos los campos son necesarios para registrarse")
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

  TypeChange($event){
    this.type = $event.target.value
  }

}
