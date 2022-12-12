import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

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
    this.router.navigate(['/start'], {replaceUrl:true}); 
  }


}
