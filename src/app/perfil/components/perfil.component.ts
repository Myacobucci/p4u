import { Component, OnInit } from '@angular/core';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MD_RADIO_DIRECTIVES} from '@angular2-material/radio';


@Component({
  moduleId: module.id,
  selector: 'app-perfil',
  templateUrl: 'perfil.component.html',
  styleUrls: ['perfil.component.css'],
  directives: [
    MdCheckbox,
    MD_RADIO_DIRECTIVES
  ],
})
export class PerfilComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
