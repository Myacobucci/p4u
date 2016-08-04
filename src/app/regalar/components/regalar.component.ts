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
import { UserSettingsService } from '../../user-settings.service';
import { MdInput } from '@angular2-material/input';
import { UserState }     from '../../core/user-state';
import { MdButton } from '@angular2-material/button';
import { Regalo } from '../../regalos/components/regalo';
import { Router} from '@angular/router-deprecated';
import { Amigo } from '../../regalos/components/amigo';


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
  itemId:string;
  userId:string;
  producto:Producto;
  regalos = List<Regalo>();
  amigos = List<Amigo>();
  userState:UserState;
  isLogged:boolean;



  constructor(private routeParams: RouteParams,
              private regalosService:RegalosService,
              private userSettingsService:UserSettingsService,
              private vidrieraService:VidrieraService,
              private router:Router) {
    this.hostImage="https://p4ucloud-mnforlenza.rhcloud.com/";
    this.imageFileName = "";
    this.productName = "";
    this.itemId = "";
    this.userId = "";
  }

  ngOnInit() {
    this.userState = this.userSettingsService.userState;
    this.isLogged = this.userState.logged;
    this.regalosService.getRegalos("1")
                        .subscribe(
                          regalos => this.regalos = regalos,
                          error => this.errorMessage = <any>error);
    this.regalosService.getAmigos()
                        .subscribe(
                          amigos => this.amigos = amigos,
                          error => this.errorMessage = <any>error);
    this.vidrieraService.getProductos()
                        .subscribe(
                          productos => this.cargarProducto(productos),
                          error => this.errorMessage = <any>error);
                      
  }

  cargarProducto(productos:List<Producto>) {
    if (this.routeParams.get('id') !== null) {
      this.itemId = this.routeParams.get('idItem')
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

  some(mensaje:string){
    if (this.isLogged) { 
    console.log(mensaje + this.userState.user.id);
    this.regalosService.regalarAUsuario(this.itemId, this.userId, mensaje, this.userState.user.id)
                        .subscribe(
                          userState => this.updateState(userState),
                          error =>  this.errorMessage = <any>error);
       
    let link = ['Vidriera', {regaloEnviado: "si"}];
    this.router.navigate(link);
    }
  }

  onChange(id:string){
    this.userId = id;
    console.log(id);
  }

  updateState(userState:UserState) {
  
}

}
