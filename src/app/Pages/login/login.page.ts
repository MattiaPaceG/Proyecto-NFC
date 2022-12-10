import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 public email = '';
 public password = '';
 public loading= null;
 loginForm: FormGroup;
 isSubmitted = false;

  constructor(private router: Router,
              private alertController: AlertController, 
              private http: HttpClient,
              private loginService : LoginService,
              private formBuilder: FormBuilder,
              private loadingController: LoadingController) { }

  async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@utp.ac.pa$')]],
      password:['', [Validators.required]],
    })
  }

  async submitForm(){

  this.isSubmitted = true;

  if (!this.loginForm.valid){
    console.log("Please provide all the required values!")
    return false;
  }else{
    this.loading = await this.loadingController.create({
      message: 'Entrando en el sistema...',
      cssClass: 'custom-loading',
    });
    this.loading.present()
    this.login()
  }
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
    this.email = this.loginForm.value.email
    this.password = this.loginForm.value.password

    const query = `?email=${this.email}&password=${this.password}`;

    const response = await this.http.get('https://Mattia.pythonanywhere.com/login' + query).toPromise();
    const data = response

    if (data == 'DENIED'){
      this.loading.dismiss();
      this.showLoginFailedAlert();
    }
    else{
      this.loading.dismiss();
      this.loginService.set_connected_id(data['db_id'], data['name'], data['cedula'], data['correo'], data['foto_url'])

      switch(data['role']){
        case 'Estudiante': 
          this.router.navigate(['/estudiante-home'], {replaceUrl:true}); 
          break;

        case 'Profesor': 
          this.router.navigate(['/profesor-home'], {replaceUrl:true}); 
          break;

        case 'Administrador': 
          this.router.navigate(['/admin-home'], {replaceUrl:true});  
          break;

        default: this.showLoginFailedAlert();
      }
    }
  }
}


