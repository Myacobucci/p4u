import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { UserState }     from '../../core/user-state';
import { User }     from '../../core/user';
import { AppSettingsService }     from '../../app-settings.service';

@Injectable()
export class OrdenService {

  private compraUri:string = "p4u/present/buy-present";

  constructor(private http:Http,
              private context:AppSettingsService) {}

  public doBuy(idUserOrigin:number, idUserDestino:number, 
  				cantidad:number, message:string, idArticulo:number):Observable<any> {
  	let url = this.context.getServiceHostName() + this.compraUri;

  	let compraRequest = {"userFrom":idUserOrigin, 
  							"userTo":idUserDestino,
  							"quantity":cantidad,
  							"text": message, 
  							"presentId" : idArticulo};

  	let body = JSON.stringify(compraRequest);
  	console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(url);
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
