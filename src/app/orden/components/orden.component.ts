import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_RADIO_DIRECTIVES } from '@angular2-material/radio/radio';
import { MdRadioButton } from '@angular2-material/radio';  
import { MdRadioDispatcher } from '@angular2-material/radio/radio_dispatcher';  

import { MdInput } from '@angular2-material/input';
import { MdButton } from '@angular2-material/button';


@Component({
  moduleId: module.id,
  selector: 'app-orden',
  templateUrl: 'orden.component.html',
  styleUrls: ['orden.component.css'],
  directives: [
  	MD_BUTTON_DIRECTIVES,
  	MD_CARD_DIRECTIVES,
    MdButton,
    MdInput,
    MdRadioButton,
  ],

  providers: [MdRadioDispatcher, MdRadioButton],
})
export class OrdenComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
