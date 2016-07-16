import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_CHECKBOX_DIRECTIVES} from '@angular2-material/checkbox';
import {MdButton} from '@angular2-material/button';


@Component({
  moduleId: module.id,
  selector: 'app-rubros',
  templateUrl: 'rubros.component.html',
  styleUrls: ['rubros.component.css'],
  directives: [
  	MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_CHECKBOX_DIRECTIVES,
  ],
})
export class RubrosComponent implements OnInit {

  constructor() {}


    articulos: Object[] = [
    {nombre: "Libreria"},
    {nombre: "Deportes"},
    {nombre: "Entretenimiento"},
    {nombre: "Comidas"},
    {nombre: "Educacion"},
    
  ];


  ngOnInit() {
  }

}
