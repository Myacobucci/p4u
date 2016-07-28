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
import { User }     from '../../core/user';
import { AppSettingsService }     from '../../app-settings.service';
import { VidrieraService } from '../../vidriera/services/vidriera.service';
import { LoginService } from '../../login/services/login.service';



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
  providers: [MdUniqueSelectionDispatcher, MdRadioButton, VidrieraService, LoginService],
})
export class OrdenComponent implements OnInit {
  errorMessage: string;
  hostImage:string;
  imageFileName:string;
  productName:string;
  producto:Producto;
  listUser:User[];


  constructor(private routeParams: RouteParams,
              private vidrieraService:VidrieraService,
              private loginService:LoginService,
              private context:AppSettingsService) {
    this.hostImage=this.context.getServiceHostName();
    this.imageFileName = "";
    this.productName = "";
    this.listUser = [];
    console.log(this.listUser);
  }

  ngOnInit() {
    this.vidrieraService.getProductos()
                        .subscribe(
                          productos => this.cargarProducto(productos),
                          error => this.errorMessage = <any>error);
    this.loginService.getAllUser()
                        .subscribe(
                          users => this.cargarUsuarios(users),
                          error => this.errorMessage = <any>error);
                          
  }

  private cargarProducto(productos:List<Producto>) {
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

  private cargarUsuarios(users:User[]) {
    this.listUser = users;
  }

}
