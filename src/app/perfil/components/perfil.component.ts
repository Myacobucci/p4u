import { Component, OnInit } from '@angular/core';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton, MdRadioGroup} from '@angular2-material/radio';

@Component({
  moduleId: module.id,
  selector: 'app-perfil',
  templateUrl: 'perfil.component.html',
  styleUrls: ['perfil.component.css'],
  directives: [
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
  ]
})
export class PerfilComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
