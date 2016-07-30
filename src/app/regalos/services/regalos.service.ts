import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Regalo } from '../components/regalo';
import { Amigo } from '../components/amigo';
import { Observable }     from 'rxjs/Observable';
import { List, Map } from 'immutable';


@Injectable()
export class RegalosService {

  private idUsuario = "";
  private regalosUrl = "http://p4ucloud-mnforlenza.rhcloud.com/p4u/notification/";
  private amigosUrl = "http://p4ucloud-mnforlenza.rhcloud.com/p4u/user/all";
  private regalarAAmigo = "http://p4ucloud-mnforlenza.rhcloud.com/p4u/present/transfer-present";

  constructor(private http:Http) {}

  public getRegalos(id: string): Observable<List<Regalo> > {
  	console.log("here");
    this.idUsuario = id;
    let url = this.regalosUrl + id;
  	return this.http.get(url)
                  .map(this.parseRegalos)
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

  private parseRegalos(res: Response) {
    let body = res.json();
    let regalos = List<Regalo>();
    for (var regalo of body) {
      var item = new Regalo(regalo); 
      regalos = regalos.push(item);
    }
    console.log("Regalos: " + regalos);
    return regalos || { };
  }

  public getAmigos(): Observable<List<Amigo> > {
    let url = this.amigosUrl;
    return this.http.get(url)
                  .map(this.parseAmigos)
                  .catch(this.handleError);
  }

  private parseAmigos(res: Response) {
    let body = res.json();
    let amigos = List<Amigo>();
    for (var amigo of body) {
      var item = new Amigo(amigo); 
      amigos = amigos.push(item);
    }
    return amigos || { };
  }

  public regalarAUsuario(Id: string, userId: string, mensaje: string){

    let body = JSON.stringify({itemId: +Id, userFrom: +this.idUsuario, userTo: +userId, msg: mensaje});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    return this.http.post(this.regalarAAmigo, body, options)
            .map(this.extractData)
            .catch(this.handleError);
  }


}
