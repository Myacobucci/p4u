import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';
import { VidrieraService } from '../services/vidriera.service';



@Component({
  moduleId: module.id,
  selector: 'app-vidriera',
  templateUrl: 'vidriera.component.html',
  styleUrls: ['vidriera.component.css'],
  directives: [
  	MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
  ],
  providers: [VidrieraService],
})
export class VidrieraComponent implements OnInit {

  constructor(private vidriera:VidrieraService) {}


  articulos: Object[];

  ngOnInit() {
    this.articulos = this.vidriera.getArticulos();
  }

}
