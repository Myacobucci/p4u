import { Component, OnInit , ChangeDetectionStrategy, Input} from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdButton } from '@angular2-material/button';
import { VidrieraService } from '../services/vidriera.service';
import { UserSettingsService } from '../../user-settings.service';
import { Articulo } from './articulo';
import { UserState }     from '../../core/user-state';
import { Producto }     from '../../core/producto';
import { Router } from '@angular/router-deprecated';
import { List, Map } from 'immutable';
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
  ],
  providers: [VidrieraService],

})
export class VidrieraComponent implements OnInit {
  errorMessage: string;
  //articulos: Articulo[];
  productos = List<Producto>();
  prodRecomendados = List<Producto>();
  userState:UserState;
  isLogged:boolean;

  constructor(private vidrieraService:VidrieraService,
              private userSettingsService:UserSettingsService,
              private router: Router) {
    this.isLogged = false;
    this.userState = new UserState();
  }

  ngOnInit() {
    /*this.vidrieraService.getArticulos()
                        .subscribe(
                          articulos => this.articulos = articulos,
                          error => this.errorMessage = <any>error);*/
    this.vidrieraService.getProductos()
                        .subscribe(
                          productos => this.productos = productos,
                          error => this.errorMessage = <any>error);

    this.userState = new UserState();
    console.log("Registrado en vidriera");
    this.userSettingsService.userStateObs$.subscribe(
        userState => {
          this.cargarRecomendaciones(userState);
        });
  }

  doLogin() {
    this.isLogged = true;
    this.userState.logged = true;
  }

  
  ngOnChanges(changes) {
    console.log("ngOnChanges");
    console.log("Cambios:" + changes);
    // Called right after our bindings have been checked but only
    // if one of our bindings has changed.
    //
    // changes is an object of the format:
    // {
    //   'prop': PropertyUpdate
    // }
  }
  ngAfterContentInit() {
    console.log("ngAfterContentInit");
    // Component content has been initialized
  }
  
  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    // Component views are initialized
    
  }
 
  cargarRecomendaciones(userState:UserState) {

    console.log("Recibido en Vidriera");
    this.userState = userState;
    this.isLogged=userState.logged;
    console.log("Me logueo: " + this.isLogged);
    if (this.isLogged) {
      let idUser = userState.user.id;
      console.log("cargarRecomendaciones: " + idUser);
      this.vidrieraService.getProductosByUser(String(idUser))
                          .subscribe(
                            productos => this.prodRecomendados = productos,
                            error => this.errorMessage = <any>error);
    } 
  }

  realizarOrden(producto:Producto) {
    console.log("Estoy logueado para comprar: " + this.isLogged);
    //if (this.isLogged) {
      let link = ['Orden', { id: producto.getId() }];
      this.router.navigate(link);    
    /*} else {
      let link = ['Login',];
      this.router.navigate(link);    
    }*/    
  }

}
