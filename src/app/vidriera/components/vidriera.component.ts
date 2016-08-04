import { Component, OnInit , ChangeDetectionStrategy, Input} from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs/tabs';
import { MdButton } from '@angular2-material/button';
import { VidrieraService } from '../services/vidriera.service';
import { UserSettingsService } from '../../user-settings.service';
import { AppSettingsService }     from '../../app-settings.service';
import { Articulo } from './articulo';
import { UserState }     from '../../core/user-state';
import { Producto }     from '../../core/producto';
import { Router } from '@angular/router-deprecated';
import { Subscription }   from 'rxjs/Subscription';
import { List, Map } from 'immutable';
import {MdProgressCircle} from '@angular2-material/progress-circle/progress-circle';
import * as moment from 'moment';
moment().format();

@Component({
  moduleId: module.id,
  selector: 'app-vidriera',
  templateUrl: 'vidriera.component.html',
  styleUrls: ['vidriera.component.css'],
  directives: [
  	MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_TABS_DIRECTIVES,
    MdProgressCircle, 
  ],
  providers: [VidrieraService],

})
export class VidrieraComponent implements OnInit {
  errorMessage: string;

  hostImage:string;
  productos = List<Producto>();
  prodRecomendados = List<Producto>();
  userState:UserState;
  isLogged:boolean;
  isWaiting:boolean;



  constructor(private vidrieraService:VidrieraService,
              private userSettingsService:UserSettingsService,
              private router: Router,
              private context:AppSettingsService) {
    
    this.hostImage= this.context.getServiceHostName();
    this.isWaiting = false;
  }

  ngOnInit() {
    this.userState = this.userSettingsService.userState;
    this.isLogged = this.userState.logged;
    this.isWaiting = true; 
    this.vidrieraService.getProductos()
                        .subscribe(
                          productos => this.cargarProductos(productos),
                          error => this.errorMessage = <any>error);
    if (this.isLogged) {
      this.cargarRecomendaciones(this.userState);  
    }
  }

  cargarProductos(productos) {
    this.isWaiting = false;
    this.productos = productos
  }

 
  cargarRecomendaciones(userState:UserState) {

    this.userState = userState;
    this.isLogged=userState.logged;
    if (this.isLogged) {
      let idUser = userState.user.id;
      this.vidrieraService.getProductosByUser(String(idUser))
                          .subscribe(
                            productos => this.prodRecomendados = productos,
                            error => this.errorMessage = <any>error);
    } 
  }

  realizarOrden(producto:Producto) {
    if (this.isLogged) {
      let link = ['Orden', { id: producto.getId() }];
      this.router.navigate(link);    
    } else {
      let link = ['Login',];
      this.router.navigate(link);    
    }
  }
  
}
