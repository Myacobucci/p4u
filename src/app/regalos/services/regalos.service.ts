import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Regalo } from '../components/regalo';
import { Observable }     from 'rxjs/Observable';
import { List, Map } from 'immutable';


@Injectable()
export class RegalosService {

  private regalosUrl = "http://p4ucloud-mnforlenza.rhcloud.com//p4u/present/by-user/";

  constructor(private http:Http) {}

  public getRegalos(id: string): Observable<List<Regalo> > {
  	console.log("here");
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


}
