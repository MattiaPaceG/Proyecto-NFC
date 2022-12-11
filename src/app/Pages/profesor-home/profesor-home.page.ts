import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-profesor-home',
  templateUrl: './profesor-home.page.html',
  styleUrls: ['./profesor-home.page.scss'],
})
export class ProfesorHomePage implements OnInit {

  public email;
  public name;
  public url;
  public id;

  constructor(private loginService: LoginService,
              private globalService: GlobalsService,
              private router: Router) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.name = await this.loginService.get_connected_nombre()
    this.email = await this.loginService.get_connected_correo()
    this.url = await this.loginService.get_connected_foto_url()
    this.id = await this.loginService.get_connected_id()
  }

  logout(event){
    this.loginService.erase_connected_id()
    this.globalService.erase_selected_group()
    this.router.navigate(['/start'], {replaceUrl:true}); 
  }


}
