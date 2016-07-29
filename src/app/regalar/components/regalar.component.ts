import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_RADIO_DIRECTIVES } from '@angular2-material/radio/radio';
import { RouteParams, } from '@angular/router-deprecated';
import { List, Map } from 'immutable';
import { MdRadioButton } from '@angular2-material/radio';
import {
  MdUniqueSelectionDispatcher
} from '@angular2-material/core/coordination/unique-selection-dispatcher';

import { Producto }     from '../../core/producto';
import { VidrieraService } from '../../vidriera/services/vidriera.service';
import { RegalosService } from '../../regalos/services/regalos.service';

import { MdInput } from '@angular2-material/input';
import { MdButton } from '@angular2-material/button';
import { Regalo } from '../../regalos/components/regalo';


@Component({
  moduleId: module.id,
  selector: 'app-orden',
  templateUrl: 'regalar.component.html',
  styleUrls: ['regalar.component.css'],
  directives: [
  	MD_BUTTON_DIRECTIVES,
  	MD_CARD_DIRECTIVES,
    MdButton,
    MdInput,
    MdRadioButton,
  ],
  providers: [MdUniqueSelectionDispatcher, MdRadioButton, RegalosService, VidrieraService],
})
export class RegalarComponent implements OnInit {
  errorMessage: string;
  hostImage:string;
  imageFileName:string;
  productName:string;
  producto:Producto;
  regalos = List<Regalo>();


  constructor(private routeParams: RouteParams,
              private regalosService:RegalosService,
              private vidrieraService:VidrieraService) {
    this.hostImage="https://p4ucloud-mnforlenza.rhcloud.com/";
    this.imageFileName = "";
    this.productName = "";
  }

  ngOnInit() {
    this.regalosService.getRegalos("1")
                        .subscribe(
                          regalos => this.regalos = regalos,
                          error => this.errorMessage = <any>error);
    this.vidrieraService.getProductos()
                        .subscribe(
                          productos => this.cargarProducto(productos),
                          error => this.errorMessage = <any>error);
                      
  }

  cargarProducto(productos:List<Producto>) {
    if (this.routeParams.get('id') !== null) {
      let id = +this.routeParams.get('id');
      var list = productos.valueSeq().toArray();
      var productoEncontrado = null;
      list.forEach(function(item:Producto) {
        if (item.getId()==id) {
          productoEncontrado = item;
        }
      });
      if (productoEncontrado) {
        this.productName = productoEncontrado.getName();
        this.imageFileName = productoEncontrado.getImageFileName();
      }
    }
  }
  onChange(){
    console.log("aquii");
  }

}
