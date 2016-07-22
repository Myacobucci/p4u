import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Articulo } from '../components/articulo';
import { Observable }     from 'rxjs/Observable';



@Injectable()
export class VidrieraService {

  private articulosUrl = "http://p4ucloud-mnforlenza.rhcloud.com/p4u/present/all";
  private articulosPorUserUrl = "http://p4ucloud-mnforlenza.rhcloud.com/p4u/present/by-user/";

  constructor(private http:Http) {}

  public getArticulos(): Observable<Articulo[]> {
  	return this.http.get(this.articulosUrl)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  public getArticulosByUser(idUser:string):Observable<Articulo[]> {
    console.log("usuario " + idUser);
    //let url = this.articulosPorUserUrl + idUser;
    let url = this.articulosPorUserUrl + "1";
    console.log("url " + url);
    return this.http.get(url)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
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
