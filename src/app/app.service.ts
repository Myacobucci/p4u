import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { User }     from './core/user';
import { AppSettingsService }     from './app-settings.service';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { Regalo } from './regalos/components/regalo';

@Injectable()
export class AppService {

  //"https://p4ucloud-mnforlenza.rhcloud.com/p4u/notification/{idUser}"
  private userNotificacionUrl:string;

  constructor(private http:Http,
  			private context:AppSettingsService) {
  	this.userNotificacionUrl = this.context.getServiceHostName() + "p4u/notification/";
  }

  getNotificaciones(usuario:User){
  	let url = this.userNotificacionUrl + usuario.id;
  	  	
  	console.log("Notificacion - Url: " + url);
  	
  	return this.http.get(url)
  				.map(this.parseRegalos)
  				.catch(this.handleError);
  }

  private parseRegalos(res: Response) {
    let body = res.json();
    let regalos = List<Regalo>();
    for (var regalo of body) {
      var item = new Regalo(regalo); 
      regalos = regalos.push(item);
    }
    console.log("Notificacion - Regalos: " + regalos);
    return regalos || { };
  }

  private handleError (error: any) {
	// In a real world app, we might use a remote logging infrastructure
	// We'd also dig deeper into the error to get a better message
  	let errMsg = (error.message) ? error.message :
  	error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	console.error(errMsg); // log to console instead
  	return Observable.throw(errMsg);
  }
}
