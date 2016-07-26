import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_RADIO_DIRECTIVES } from '@angular2-material/radio/radio';
import { RouteParams, } from '@angular/router-deprecated';
import { List, Map } from 'immutable';
import { MdRadioButton } from '@angular2-material/radio';
import { MdRadioDispatcher } from '@angular2-material/radio/radio_dispatcher';  
import { Producto }     from '../../core/producto';
import { VidrieraService } from '../../vidriera/services/vidriera.service';


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
  providers: [MdRadioDispatcher, MdRadioButton, VidrieraService],
})
export class OrdenComponent implements OnInit {
  errorMessage: string;
  hostImage:string;
  imageFileName:string;
  productName:string;
  producto:Producto;

  constructor(private routeParams: RouteParams,
              private vidrieraService:VidrieraService) {
    this.hostImage="https://p4ucloud-mnforlenza.rhcloud.com/";
    this.imageFileName = "";
    this.productName = "";
  }

  ngOnInit() {
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

}
