import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


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
  public cedula = '';
  public type = '';
  public submitId;
  public students: Student[] = [];
  private loader: HTMLIonLoadingElement;
  private CEDULA_PATTERN = /^([a-zA-Z0-9]{2}-[0-9]{4}-[0-9]{6})$/;
  isSubmitted = false;
  registerForm: FormGroup;
  typenotchose = true;

  constructor(private http: HttpClient, 
              private alertController: AlertController, 
              private route: Router, 
              private loadingController: LoadingController,
              public formBuilder: FormBuilder) { }


  async ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first:['', [Validators.required]],
      last:['', [Validators.required]],
      cedula:['', [Validators.required, Validators.pattern('[a-zA-z0-9]{2}-[0-9]{4}-[0-9]{6}')]],
      email:['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:['', [Validators.required]],
    })
  
    await this.loadingController.create()
    .then(loader => this.loader = loader)
    .then(() => this.loader.present())
    .then(() => this.http.get('https://asistencia-upn43.ondigitalocean.app/api/estudiantes/all').toPromise())
    .then(response => (response as any[]).map(data => Student.fromJSON(data)))
    .then(students => this.students = students)
    .catch(err => console.error(err))
    .finally(() => this.loader?.dismiss());
  }


  submitForm(){

    this.isSubmitted = true;

    if (!this.registerForm.valid || this.typenotchose){
      console.log("Please provide all the required values!")
      return false;
    }else{
      this.register()
    }
  }

  async register(){
    this.first =this.registerForm.value.first
    this.last = this.registerForm.value.last
    this.email = this.registerForm.value.email
    this.password = this.registerForm.value.password
    this.cedula = this.registerForm.value.cedula
    this.submitId = 1

    if (this.type == "Estudiante"){
      const student = this.students.find(s => this.cedula === s.identification)
      this.submitId = student.id
      if (student == null){
         this.showAlert('Cedula de estudiante no encontrada!')
         return 0
      }
    }

    const query = `?email=${this.email}&password=${this.password}&role=${this.type}&first=${this.first}&last=${this.last}&cedula=${this.cedula}&subID=${this.submitId}`;
    const response = await this.http.get('https://Mattia.pythonanywhere.com/register' + query).toPromise();

    if (response == "-1"){
      return this.showAlert('El e-mail utilizado està ya registrado');
    }
    else if (response == "-2"){
      return this.showAlert('La cedula ha ya sido registrada');
    }
    else{
      this.showAlert('El nuevo usuario se ha registrado con exito!');
      this.route.navigate(['/start']);
    }
  }

  
  get errorControl() {
    return this.registerForm.controls;
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
    this.typenotchose = false;
  }
  
}
