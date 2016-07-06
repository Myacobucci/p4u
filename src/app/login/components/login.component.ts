import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES} from '@angular2-material/card';
import { MdButton} from '@angular2-material/button';
import { MdInput } from '@angular2-material/input';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [
  	MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdInput,
    MdButton
  ],
})
export class LoginComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
