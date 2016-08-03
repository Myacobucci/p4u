import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { User }     from './core/user';
import { AppSettingsService }     from './app-settings.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

  //"https://p4ucloud-mnforlenza.rhcloud.com/p4u/notification/{idUser}"
  private userNotificacionUrl:string;

  constructor(private http:Http,
  			private context:AppSettingsService) {
  	this.userNotificacionUrl = this.context.getServiceHostName() + "p4u/notification/";
  }

  obtenerNotificaciones(usuario:User){
  	let url = this.userNotificacionUrl + usuario.id;
	let body = "";
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	
	console.log("Notificacion - Url: " + url);
	console.log("Notificacion - body: " + body);    	
	console.log("Notificacion - headers: " + headers);
	console.log("Notificacion - Options: " + options);

	return this.http.post(url, body, options)
				.map(this.extractData)
				.catch(this.handleError);
  }

  private extractData(res: Response) {
  	let body = res.json();
  	console.log(body);
  	
  	return body || { };
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
