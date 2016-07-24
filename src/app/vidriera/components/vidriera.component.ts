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
//import { List, Map } from 'immutable';
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
  articulos: Articulo[];
  @Input() productos = List<Producto>();
  @Input() userState:UserState;
  @Input() isLogged:boolean;

  constructor(private vidrieraService:VidrieraService,
              private userSettingsService:UserSettingsService,
              private router: Router) {
    this.isLogged = false;
    this.userState = new UserState();
  }

  ngOnInit() {
    this.vidrieraService.getArticulos()
                        .subscribe(
                          articulos => this.articulos = articulos,
                          error => this.errorMessage = <any>error);
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
    this.userState = new UserState();
    console.log("Registrado en app component");
    this.userSettingsService.userStateObs$.subscribe(
        userState => {
          console.log("Recibido en Vidriera");
          this.userState = new UserState();
          this.userState = userState;
          this.isLogged=userState.logged;
          if (userState.logged) {
            let idUser = userState.user.id;
            this.cargarRecomendaciones(String(idUser));
          } 
        });
    console.log(this.userSettingsService.userStateSource.observers);
  }
 
  

  cargarRecomendaciones(idUser:string) {
    this.vidrieraService.getArticulosByUser(idUser)
                        .subscribe(
                          articulos => this.cargarArticuloRecomendados(articulos),
                          error => this.errorMessage = <any>error);
  }

  cargarArticuloRecomendados(articulos:Articulo[]) {
    console.log("Esta logueado: " + this.isLogged);
    this.productos = List<Producto>();
    for ( var item of articulos) {
      console.log("Item: " + item.id);
      const nuevoProducto = new Producto(item);
      console.log("producto: " + nuevoProducto.getId());
      this.productos = this.productos.push(nuevoProducto);
    }
  }

  realizarOrden(articulo:Articulo) {
    let link = ['Orden', { id: articulo.id }];
    this.router.navigate(link);    
  }

}
