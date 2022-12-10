import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private connected_id = new BehaviorSubject('')
  private nombre = new BehaviorSubject('')
  private cedula = new BehaviorSubject('')
  private correo = new BehaviorSubject('')
  private foto_url = new BehaviorSubject('')

  constructor() {
  }

  set_connected_id(id, nombre, cedula, correo, foto_url){
    this.connected_id = new BehaviorSubject(id.toString());
    this.nombre = new BehaviorSubject(nombre.toString());
    this.cedula = new BehaviorSubject(cedula.toString());
    this.correo = new BehaviorSubject(correo.toString());
    this.foto_url = new BehaviorSubject(foto_url.toString());
  }

  erase_connected_id(){
    this.connected_id = new BehaviorSubject('');
    this.nombre = new BehaviorSubject('')
    this.cedula = new BehaviorSubject('')
    this.correo = new BehaviorSubject('')
    this.foto_url = new BehaviorSubject('')
  }

  get_all_info(){
    return [this.connected_id, this.nombre, this.cedula, this.correo, this.foto_url]
  }

  get_connected_id(){
    return this.connected_id.getValue()
  }

  get_connected_nombre(){
    return this.nombre.getValue()
  }

  get_connected_cedula(){
    return this.cedula.getValue()
  }

  get_connected_correo(){
    return this.correo.getValue();
  }

  get_connected_foto_url(){
    return this.foto_url.getValue();
  }

}
