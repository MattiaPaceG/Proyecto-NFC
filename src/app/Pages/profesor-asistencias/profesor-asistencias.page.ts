import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Group } from 'src/app/models/groups';
import { Attendance } from 'src/app/models/attendance';
import { Student } from 'src/app/models/student';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { GlobalsService } from 'src/app/services/globals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor-asistencias',
  templateUrl: './profesor-asistencias.page.html',
  styleUrls: ['./profesor-asistencias.page.scss'],
})
export class ProfesorAsistenciasPage implements OnInit {


  public attendences: Attendance[] = []
  public view_attendences: Attendance[] = []

  public groups: Group[] = []
  public groups_map = new Map <string, string[]>();
  public selected_group: Group[] = [];
  public title: String;

  public students: Student[] = []
  public students_map = new Map<string, string[]>();

  public isStudFiltered = false;
  public isEstadoFiltered = false;
  public studentFilter: String[] = [];
  public StateFilter: String[] = [];
  public hasResults = true;

  constructor(private alertController: AlertController,
              private http: HttpClient,
              private loginService : LoginService,
              private globalService: GlobalsService,
              private loadingController: LoadingController,
              private router: Router) { }

  ngOnInit() {
  }

  async get_group_info(){
    var response = await this.http.get('https://asistencia-upn43.ondigitalocean.app/api/grupos/all').toPromise()
    .then (response => (response as any[]).map(data => Group.fromJSON(data)))
    .then (groups => this.groups = groups)
    .catch(err => console.error(err))

    var selected_group = this.groups.filter(s=> s.id.toString() == this.globalService.get_selected_group())[0]

    this.groups_map.set(String(this.globalService.get_selected_group()), [selected_group.asignatura, selected_group.codigo])

    this.title=selected_group.asignatura+' ('+selected_group.codigo+')'

  }

  async getStudents(){
    var response = await this.http.get('https://asistencia-upn43.ondigitalocean.app/api/estudiantes/grupos/'+this.globalService.get_selected_group()).toPromise()
    .then (response => (response as any[]).map(data => Student.fromJSON(data)))
    .then (students => this.students = students)
    .catch(err => console.error(err))

    for (const student of this.students){
      // order is NAME, LAST_NAME, CEDULA, FOTO URL
      this.students_map.set(String(student.id), [student.name, student.lastName, student.identification, student.photoUrl])
    }
  }

  async getAttendances(){
    console.log('https://asistencia-upn43.ondigitalocean.app/api/estudiantes/asistencia/'+this.globalService.get_selected_group())
    var response = await this.http.get('https://asistencia-upn43.ondigitalocean.app/api/estudiantes/asistencia/'+this.globalService.get_selected_group()).toPromise()
    .then (response => (response as any[]).map(data => Attendance.fromJSON(data, this.groups_map)))
    .then (att => this.attendences = att)
    .catch(err => console.error(err))
}

  async ionViewWillEnter(){
        //show loading spinner
        var loading = await this.loadingController.create({
          message: 'Recuperando informacion...',
          cssClass: 'custom-loading',
        })
        loading.present()

        //load group info
        await this.get_group_info()


        //get student list in the group
        await this.getStudents()

        //get all attendences of every student in the group (unfiltered)
        await this.getAttendances()

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

  public getColor(index :number) : string {
    switch( index) {
      case 1 : return "#41A33E"
      case 2 : return "#E3B778"
      case 3 : return "#960019"
      case 4 : return "#FA8072"
    }
  }

  applyEstFilter(ev){
    this.studentFilter = ev.target.value
    this.applyFilters()
  }

  eraseEstFilter(){
    this.isStudFiltered = false
    this.studentFilter = []
    this.applyFilters()
  }

  applyStateFilter(ev){
    this.StateFilter = ev.target.value
    this.applyFilters()
  }

  applyFilters(){

    // no filters selected, returns original list
    if (this.studentFilter.length == 0 && this.StateFilter.length == 0){
      this.view_attendences = this.attendences
      this.isStudFiltered = false
    }
    else if(this.studentFilter.length > 0 && this.StateFilter.length == 0){
      this.view_attendences = this.attendences.filter (s => this.studentFilter.includes(this.students_map.get(s.est_id.toString())[2]) )
      this.isStudFiltered = true
    }
    else if(this.studentFilter.length == 0 && this.StateFilter.length > 0){
      this.view_attendences = this.attendences.filter (s => this.StateFilter.includes(s.estado.toString()) )
    }
    else{
      this.view_attendences = this.attendences.filter (s => this.studentFilter.includes(this.students_map.get(s.est_id.toString())[2]))
      this.view_attendences = this.view_attendences.filter (s => this.StateFilter.includes(s.estado.toString()))
      this.isStudFiltered = true
    }

    this.hasResults = this.check_attendances_length()
  }

  logout(event){
    this.loginService.erase_connected_id()
    this.globalService.erase_selected_group()
    this.router.navigate(['/start'], {replaceUrl:true}); 
  }

}
