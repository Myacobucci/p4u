import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdButton } from '@angular2-material/button';
import { VidrieraService } from '../services/vidriera.service';
import { UserSettingsService } from '../../user-settings.service';
import { Articulo } from './articulo';
import { UserState }     from '../../core/user-state';





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
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class VidrieraComponent implements OnInit {
  errorMessage: string;
  articulos: Articulo[];
  articulosPorUsuario: Articulo[];
  userState:UserState;
  isLogged:boolean;

  constructor(private vidrieraService:VidrieraService,
              private userSettingsService:UserSettingsService) {
    this.isLogged = false;
  }

  ngOnInit() {
    this.vidrieraService.getArticulos()
                        .subscribe(
                          articulos => this.articulos = articulos,
                          error => this.errorMessage = <any>error);

    this.userState = new UserState();
    console.log("Registrado en app component");
    this.userSettingsService.userStateObs$.subscribe(
        userState => {
          console.log("Recibido en Vidriera");
          this.userState = userState;
          this.isLogged=userState.logged;
          if (userState.logged) {
            let idUser = userState.user.id;
            this.cargarRecomendaciones(String(idUser));
          } else {
            this.articulosPorUsuario = [];
          }
        });
    console.log(this.userSettingsService.userStateSource.observers);
    

  }


  cargarArticulo(articulos:Articulo[]) {
    this.articulosPorUsuario = articulos;
    console.log("articulos recibido: " + this.articulosPorUsuario);
    console.log("Esta logueado: " + this.isLogged);
  
  }

  cargarRecomendaciones(idUser:string) {
    this.vidrieraService.getArticulosByUser(idUser)
                        .subscribe(
                          articulos => this.cargarArticulo(articulos),
                          error => this.errorMessage = <any>error);
  }


}
