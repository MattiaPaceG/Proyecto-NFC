import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/groups';
import { AlertController, IonSelect, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/services/globals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor-asignaturas',
  templateUrl: './profesor-asignaturas.page.html',
  styleUrls: ['./profesor-asignaturas.page.scss'],
})
export class ProfesorAsignaturasPage implements OnInit {

  public groups: Group[] = []

  constructor(private alertController: AlertController,
              private http: HttpClient,
              private loginService : LoginService,
              private globalService: GlobalsService,
              private loadingController: LoadingController,
              private router: Router) { }

  ngOnInit() {
  }

  async getGroups(){
    var response = await this.http.get('https://asistencia-upn43.ondigitalocean.app/api/grupos/profesor/'+this.loginService.get_connected_id()).toPromise()
    .then (response => (response as any[]).map(data => Group.fromJSON(data)))
    .then (groups => this.groups = groups)
    .catch(err => console.error(err))
}

  async ionViewWillEnter(){

     //show loading spinner
     var loading = await this.loadingController.create({
      message: 'Recuperando informacion...',
      cssClass: 'custom-loading',
    })
    loading.present()

    //get professor groups
    await this.getGroups()

    this.globalService.erase_selected_group()

    loading.dismiss()

    console.log(this.groups)

  }

  PasarAsistencia(ev){
    this.globalService.set_selected_group(ev)
    this.router.navigate(['profesor-asistencia-nfc'])
  }

  VisualizarAsistencia(ev){
    this.globalService.set_selected_group(ev)
    this.router.navigate(['profesor-asistencias'])
  }

  logout(event){
    this.loginService.erase_connected_id()
    this.globalService.erase_selected_group()
    this.router.navigate(['/start'], {replaceUrl:true}); 
  }

}
