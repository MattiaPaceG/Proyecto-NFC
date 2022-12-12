import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  selected_group = new BehaviorSubject('');

  constructor() { }

  set_selected_group(group){
    this.selected_group = new BehaviorSubject(group.toString())
  }

  erase_selected_group(){
    this.selected_group = new BehaviorSubject('');
  }

  get_selected_group(){
    return this.selected_group.getValue();
  }
}
