import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdButton } from '@angular2-material/button';
import { RegalosService } from '../services/regalos.service';
import { UserSettingsService } from '../../user-settings.service';
import { Regalo } from './regalo';
import { RouteParams, } from '@angular/router-deprecated';
import { UserState }     from '../../core/user-state';
import { Subscription }   from 'rxjs/Subscription';
import { List, Map } from 'immutable';
import { Router } from '@angular/router-deprecated';
import * as moment from 'moment';
moment().format();

@Component({
  moduleId: module.id,
  selector: 'app-regalos',
  templateUrl: 'regalos.component.html',
  styleUrls: ['regalos.component.css'],
  directives: [
  	MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
  ],
  providers: [RegalosService],
  

})
export class RegalosComponent implements OnInit {
  errorMessage: string;
  hostImage:string;
  regalos = List<Regalo>();
  regalosCanjeados = List<Regalo>();
  regalosCanjeados2 = List<Regalo>();
  userState:UserState;
  isLogged:boolean;
  message: string;
  mensjRegAceptado: string;
  titRegExpir: string;
  messageCanj: string;
  codigoRegaloProxAVencer: string;
  canjeados: Array<Regalo> = [];
  noCanjeados: Array<Regalo> = [];
  expirados: Array<Regalo> = [];
  private _regalosCanjeados2: List<Regalo> ;

  constructor(private routeParams: RouteParams,
              private regalosService:RegalosService,
              private userSettingsService:UserSettingsService,
              private router: Router) {

    this.hostImage="https://p4ucloud-mnforlenza.rhcloud.com/";
    
  }

  ngOnInit() {
    this.userState = this.userSettingsService.userState;
    this.isLogged = this.userState.logged;
    if (this.isLogged) {
      let idUser = this.userState.user.id;
      console.log(idUser);
    this.regalosService.getRegalos(String(idUser))
                        .subscribe(
                          regalos => this.regalos = regalos,
                          error => this.errorMessage = <any>error);
                      

    this.regalosService.getRegalos(String(idUser))
                        .subscribe(
                          regalosCanjeados => this.filtroCanjeados(regalosCanjeados),
                          error => this.errorMessage = <any>error);
                      }
    this.regalosCanjeados = this.regalos; 
    if (this.routeParams.get('acepta') == "si"){
      this.mensjRegAceptado = "       El regalo fue aceptado correctamente."
    }
    if (this.routeParams.get('regaloEnviado') == "si"){
      this.mensjRegAceptado = "       El regalo fue enviado al usuario correctamente."
    }

  }


  filtroCanjeados(regalos:List<Regalo>) {
    var canje: Array<Regalo> = [];
    var noCanje: Array<Regalo> = [];
    var expi: Array<Regalo> = [];
    var mes: string;
    var mesCanj: string;
    var mesExp: string;
    var codProxAExp: string;
    var i = 1;
    regalos.forEach(function(item:Regalo) {
      if (item.getExpired()){
        expi.push(item);
        mesExp = "Regalos Expirados";
      } else if (item.getState() == "Canjeado"){
        canje.push(item);
        console.log(item.getCodigo());
        mesCanj = "Mis Regalos Aceptados";
      } else {
        noCanje.push(item);
        mes = "Mis Regalos Recibidos";
        if (i == 1){
          i = 0;
          codProxAExp = item.getCodigo();
        }
      }
    });
    this.canjeados = canje;
    this.noCanjeados = noCanje;
    this.message = mes;
    this.messageCanj = mesCanj;
    this.expirados = expi;
    this.titRegExpir = mesExp;
    this.codigoRegaloProxAVencer = codProxAExp;
  }


  regalar(regalo:Regalo) {
    if (this.isLogged) {
      let link = ['Regalar', { id: regalo.getId(),idItem: regalo.getItemId()  }];
      this.router.navigate(link);    
    } else {
      let link = ['Login',];
      this.router.navigate(link);    
    }
  }

  canjear(regalo:Regalo) {
    if (this.isLogged) {
    this.regalosService.canjearRegalo(regalo.getItemId())
                        .subscribe(
                          userState => this.updateState(userState),
                          error =>  this.errorMessage = <any>error);

     let link = ['Vidriera',];
     this.router.navigate(link);
     let link2 = ['Regalos', {acepta: "si"}];
     this.router.navigate(link2);
   }
   let a = "a";
  }

updateState(userState:UserState) {
       
  }



}