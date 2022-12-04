import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-estudiante-home',
  templateUrl: './estudiante-home.page.html',
  styleUrls: ['./estudiante-home.page.scss'],
})
export class EstudianteHomePage implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log(this.loginService.get_connected_id())
  }

}
