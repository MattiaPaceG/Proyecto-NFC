import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, IonSelect, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Group } from 'src/app/models/groups';
import { Attendance } from 'src/app/models/attendance';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiante-asistencia',
  templateUrl: './estudiante-asistencia.page.html',
  styleUrls: ['./estudiante-asistencia.page.scss'],
})
export class EstudianteAsistenciaPage implements OnInit {

  public groups: Group[] = []
  public attendences: Attendance[] = []
  public view_attendences: Attendance[] = []
  public groups_map = new Map <string, string[]>();
  public isAsigFiltered = false;
  public isEstadoFiltered = false;
  public AsignaturaFilter: String[] = [];
  public StateFilter: String[] = [];
  public hasResults = true;


  constructor(private alertController: AlertController,
              private http: HttpClient,
              private loginService : LoginService,
              private loadingController: LoadingController,
              private router: Router) { }


  ngOnInit() {}

  async getGroups(){
      var response = await this.http.get('https://asistencia-upn43.ondigitalocean.app/api/grupos/estudiante/'+this.loginService.get_connected_id()).toPromise()
      .then (response => (response as any[]).map(data => Group.fromJSON(data)))
      .then (groups => this.groups = groups)
      .catch(err => console.error(err))
  }

  async getAttendances(group_id){
    var query = group_id + '/' + '32'   /*this.loginService.get_connected_id()*/
    var response = await this.http.get('https://asistencia-upn43.ondigitalocean.app/api/estudiante/asistencia/'+query).toPromise()
    .then (response => (response as any[]).map(data => Attendance.fromJSON(data, this.groups_map)))
    .then (att => this.attendences = this.attendences.concat(att))
    .catch(err => console.error(err))
}


  async ionViewWillEnter(){

    //show loading spinner
    var loading = await this.loadingController.create({
      message: 'Recuperando informacion...',
      cssClass: 'custom-loading',
    })
    loading.present()

    //get groups in which user is registered

    await this.getGroups()

    for (const group of this.groups){
      this.groups_map.set(String(group.id), [group.asignatura, group.codigo])
    }

    //get all attendences (unfiltered)

    for (const att of this.groups){
      await this.getAttendances(att.id);
    }

    this.view_attendences = this.attendences

    this.hasResults = this.check_attendances_length()

    loading.dismiss()

  }

  check_attendances_length(){
    if (this.view_attendences.length > 0){
      return true
    }
    return false
  }

  applyAsigFilter(ev){
    this.AsignaturaFilter = ev.target.value
    this.applyFilters()
  }

  applyStateFilter(ev){
    this.StateFilter = ev.target.value
    this.applyFilters()
  }

  applyFilters(){

    // no filters selected, returns original list
    if (this.AsignaturaFilter.length == 0 && this.StateFilter.length == 0){
      this.view_attendences = this.attendences
    }
    else if(this.AsignaturaFilter.length > 0 && this.StateFilter.length == 0){
      this.view_attendences = this.attendences.filter (s => this.AsignaturaFilter.includes(s.nombre_asignatura) )
    }
    else if(this.AsignaturaFilter.length == 0 && this.StateFilter.length > 0){
      this.view_attendences = this.attendences.filter (s => this.StateFilter.includes(s.estado.toString()) )
    }
    else{
      this.view_attendences = this.attendences.filter (s => this.AsignaturaFilter.includes(s.nombre_asignatura))
      this.view_attendences = this.view_attendences.filter (s => this.StateFilter.includes(s.estado.toString()))
    }

    this.hasResults = this.check_attendances_length()
  }

  public getColor(index :number) : string {
    switch( index) {
      case 1 : return "#41A33E"
      case 2 : return "#E3B778"
      case 3 : return "#960019"
      case 4 : return "#FA8072"
    }
  }

  logout(event){
    this.loginService.erase_connected_id()
    this.router.navigate(['/start'], {replaceUrl:true}); 
  }
}
