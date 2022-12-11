import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ndef, NFC } from '@awesome-cordova-plugins/nfc/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { encode } from 'js-base64';
import md5 from 'js-md5';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-register-tag',
  templateUrl: './admin-register-tag.page.html',
  styleUrls: ['./admin-register-tag.page.scss'],
})
export class AdminRegisterTagPage implements OnDestroy, OnInit {
  public id = '';
  public identification = '';
  private nfc$: Subscription;

  public loading= null;
  tagInfoForm: FormGroup
  isSubmitted = false;

  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private alertController: AlertController,
    private toastController: ToastController,
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    this.tagInfoForm = this.formBuilder.group({
      id:['', [Validators.required]],
      identification:['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{2}-[0-9]{4}-[0-9]{6}')]]
    })
  }

  async startListening() {
    const toast = await this.toastController.create({
      message: 'Acerca el tag NFC',
      duration: 1500,
      icon: 'radio',
      color: 'primary'
    });

    await toast.present();

    this.nfc$ = this.nfc.addTagDiscoveredListener().subscribe(
      () => this.writeToCard(),
      err => this.onFailed(err)
    );
  }

  ngOnDestroy() {
    if (this.nfc$){
    this.nfc$.unsubscribe();
    }
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

  async writeToCard() {
    try {
      const message = [
        this.ndef.textRecord(md5(encode(`${this.identification}@${this.id}`))),
      ];

      await this.nfc.write(message);

      const toast = await this.toastController.create({
        message: 'Tag actualizado',
        duration: 1500,
        icon: 'checkmark-circle',
        color: 'success'
      });

      await toast.present();
    } catch {
      const alert = await this.alertController.create({
        buttons: [
          {
            text: 'Error al grabar datos',
            role: 'confirm'
          },
        ],
      });

      await alert.present();
    }
  }

  logout(event){
    this.loginService.erase_connected_id()
    this.router.navigate(['/start'], {replaceUrl:true}); 
  }

  async submitForm(){
    console.log("PRUEBA")
    this.isSubmitted = true;

    if (!this.tagInfoForm.valid){
      console.log("Please provide all the required values!")
      return false;
    }else{
      this.loading = await this.loadingController.create({
        message: 'Preparando funcionalidades NFC...',
        cssClass: 'custom-loading',
      });
      this.loading.present()
      this.startListening()
    }
  }

}
