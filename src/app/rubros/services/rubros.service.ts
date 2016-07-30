import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Preferencia } from '../components/preferencia';
import { Observable }     from 'rxjs/Observable';
import { UserState }     from '../../core/user-state';
import { List, Map } from 'immutable';
import { Pref } from '../components/pref';
import { AppSettingsService }     from '../../app-settings.service';


@Injectable()
export class RubrosService {


  private updateUrl = "p4u/user/update-preferences/";
  private preferenciasUrl = "p4u/preference/all";
  private preferenciasPorUserUrl = "p4u/user/preferences/";
  

  constructor(private http:Http,
              private context:AppSettingsService) {}

  public getPreferencias(): Observable< List<Pref> > {
    console.log("getPreferencias url " + this.preferenciasUrl);
    let url = this.context.getServiceHostName() + this.preferenciasUrl;
  	return this.http.get(url)
                  .map(this.parseProductos)
                  .catch(this.handleError);
    
  }


  public getPreferenciasPorUsuario(idUser:string):Observable< List<Pref> > {
    console.log("usuario " + idUser);
    let url = this.context.getServiceHostName() + this.preferenciasPorUserUrl + idUser;
    //let url = this.preferenciasPorUserUrl + "1";
    console.log("getPreferenciasPorUsuario url " + url);
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



  updatePreference(idUser:string, arrayChecked:boolean[]):Observable<UserState> {
    var keyString = this.buildKeys(arrayChecked);

    let url = this.context.getServiceHostName() + this.updateUrl + idUser + "/" + keyString
    let body = "";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(url);
    return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  buildKeys(arrayChecked) {
    var keys = [];
    for (var key in arrayChecked) {
      if(arrayChecked.hasOwnProperty(key)) {
        var checked = arrayChecked[key];
        if (checked) {
          keys.push(key);
        }
      }
    }
    var keyString = keys.join(",");
    return keyString;
  }



  private parseProductos(res: Response) {
    let body = res.json();
    let prefs = List<Pref>();
    for (var pref of body) {
      var item = new Pref(pref); 
      prefs = prefs.push(item);
      console.log("Id: " + item.getId() + " name: "+ item.getName());  
    }
    console.log("Prefs: " + prefs);
    return prefs || { };
  }


}
