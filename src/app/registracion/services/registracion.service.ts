import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserState } from '../../core/user-state';
import { User } from '../../core/user';

@Injectable()
export class RegistracionService {

	private userRegisterUrl = "https://p4ucloud-mnforlenza.rhcloud.com/p4u/user/register";

	constructor(private http:Http) {}

	doRegistrar(usuario:User):Observable<UserState> {
  	
  		let body = JSON.stringify(usuario, ['email', 'username', 'password', 
  			'facebookUserName', 'address', 'firstName', 'lastName', 'birthDate']);
    	let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	
    	console.log("Registracion - Url: " + this.userRegisterUrl);
    	console.log("Registracion - body: " + body);    	
    	console.log("Registracion - headers: " + headers);
    	console.log("Registracion - Options: " + options);

    	return this.http.post(this.userRegisterUrl, body, options)
    				.map(this.extractData)
    				.catch(this.handleError);
  	}

  	private extractData(res: Response) {
    	let body = res.json();
    	console.log(body);
    	let response = { };
    	if(body != "") {
    		let userState = new UserState();
    		userState.logged = true;
    		userState.user = body;

    		response = userState;
    	}
    	
    	return response || { };
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
