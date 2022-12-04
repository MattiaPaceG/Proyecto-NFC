import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private connected_id = new BehaviorSubject('20')

  constructor() {
  }

  set_connected_id(id){
    this.connected_id = new BehaviorSubject(id.toString());
  }

  erase_connected_id(){
    this.connected_id = new BehaviorSubject('');
  }

  get_connected_id(){
    return this.connected_id.asObservable();
  }

}
