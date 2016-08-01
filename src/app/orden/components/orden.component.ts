import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_RADIO_DIRECTIVES } from '@angular2-material/radio/radio';
import { RouteParams, } from '@angular/router-deprecated';
import { List, Map } from 'immutable';
import { MdRadioButton } from '@angular2-material/radio';
import { MdToolbar } from '@angular2-material/toolbar';
import { UserSettingsService } from '../../user-settings.service';
import {
  MdUniqueSelectionDispatcher
} from '@angular2-material/core/coordination/unique-selection-dispatcher';

import { Producto }     from '../../core/producto';
import { User }     from '../../core/user';
import { AppSettingsService }     from '../../app-settings.service';
import { VidrieraService } from '../../vidriera/services/vidriera.service';
import { LoginService } from '../../login/services/login.service';
import { OrdenService } from '../../orden/services/orden.service';


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
    ROUTER_DIRECTIVES,
    MdButton,
    MdInput,
    MdToolbar,
    MdRadioButton,
  ],
  providers: [MdUniqueSelectionDispatcher, MdRadioButton, VidrieraService, OrdenService  , LoginService],
})
export class OrdenComponent implements OnInit {
  message: string;
  errorMessage: string;
  hostImage:string;
  imageFileName:string;
  productId:number;
  productName:string;
  productCost:number;
  producto:Producto;
  cantidad:number;
  nroTarjeta:string;
  idUserOrigen:number;
  idUserDestino:number;
  usuarioDestino:string;
  groupValue:string="0";
  listUser:User[];
  step:number;

  messageText:string;
  numeroTajeta:string;

  constructor(private routeParams: RouteParams,
              private vidrieraService:VidrieraService,
              private loginService:LoginService,
              private userSettingsService:UserSettingsService,
              private context:AppSettingsService,
              private ordenService:OrdenService,
              private router:Router) {
    this.hostImage=this.context.getServiceHostName();
    this.idUserOrigen = -1;
    this.idUserDestino = -1;
    this.imageFileName = "";
    this.productName = "";
    this.listUser = [];
    this.step = 1;
    this.productCost=0;
    this.cantidad=1;
    this.groupValue="0";
    this.numeroTajeta="XXXXX";
    this.usuarioDestino="";
    this.messageText="";
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
    if (this.userSettingsService.userState.logged) {
      this.idUserOrigen=this.userSettingsService.userState.user.id;  
    }
                          
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
        this.productCost = productoEncontrado.getCost();
        this.productId = productoEncontrado.getId();
      }
    }
  }

  private cargarUsuarios(users:User[]) {
    this.listUser = users;
    console.log(this.listUser);
  }
  private getUserName(idUser:number) {
    for (let user of this.listUser) {
      if (user.id == idUser) {
        return user.firstName + " " + user.lastName;
      }
    }
  }

  goConfirm() {

    if (this.groupValue== "0" ) {
      this.idUserDestino = this.idUserOrigen; 
    }
    console.log(this.idUserDestino);
    this.usuarioDestino = this.getUserName(this.idUserDestino);
    this.step = 2;  
    
  }
  goInicio() {
    this.step = 1;
  }

  goFinal() {
    if (this.idUserDestino == -1) {
      this.errorMessage = "Debe seleccionar un usuario destino";
    } else if (this.cantidad < 1) {
      this.errorMessage = "Debe seleccionar un cantidad positiva";
    } else {
      this.ordenService.doBuy(this.idUserOrigen, this.idUserDestino, 
                            this.cantidad, this.messageText, this.productId).subscribe(
                              respuesta => this.finalizarCompra(respuesta),
                              error =>  this.errorMessage = <any>error);  
    }
  }

  finalizarCompra(respuesta) {
    this.step = 3;
  }

  goMisRegalos() {
    let link = ['Regalos',];
    this.router.navigate(link);
  }
}
