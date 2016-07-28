import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Preferencia } from '../components/preferencia';
import { Observable }     from 'rxjs/Observable';
import { UserState }     from '../../core/user-state';
import { List, Map } from 'immutable';
import { Pref } from '../components/pref';


@Injectable()
export class RubrosService {


  private preferenciasUrl = "http://p4ucloud-mnforlenza.rhcloud.com/p4u/preference/all";
  private preferenciasPorUserUrl = "http://p4ucloud-mnforlenza.rhcloud.com/p4u/user/preferences/";
  private postPreferenceUrl:string = "http://p4ucloud-mnforlenza.rhcloud.com/p4u/user/add-preference/";
  private deletePreferencesUrl = "http://p4ucloud-mnforlenza.rhcloud.com/p4u/user/remove-all-preferences/";

  constructor(private http:Http) {}

  public getPreferencias(): Observable< List<Pref> > {
    console.log("aca")
    console.log("url " + this.preferenciasUrl);
  	return this.http.get(this.preferenciasUrl)
                  .map(this.parseProductos)
                  .catch(this.handleError);
    
  }


  public getPreferenciasPorUsuario(idUser:string):Observable<Preferencia[]> {
    console.log("usuario " + idUser);
    let url = this.preferenciasPorUserUrl + idUser;
    //let url = this.preferenciasPorUserUrl + "1";
    console.log("url " + url);
    return this.http.get(url)
                  .map(this.parseProductos)
                  .catch(this.handleError);
  }

  

  private extractData(res: Response) {
    let body = res.json();
    console.debug(body);
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


  saveOnePreference(user:string, id:string):Observable<UserState> {
    let url = this.postPreferenceUrl + user + "/" + id;

    let body = "";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(url);
    return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  deletePreferences(user:string):Observable<UserState> {
    let url = this.deletePreferencesUrl + user;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(url);
    return this.http.delete(url, options)
            .map(this.extractData)
            .catch(this.handleError);
  }

    private parseProductos(res: Response) {
    let body = res.json();
    let prefs = List<Pref>();
    for (var pref of body) {
      var item = new Pref(pref); 
      prefs = prefs.push(item);
    }
    console.log("Prefs: " + prefs);
    return prefs || { };
  }


}
