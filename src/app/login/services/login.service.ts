import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { UserState }     from '../../core/user-state';
import { User }     from '../../core/user';
import { AppSettingsService }     from '../../app-settings.service';
import { List, Map } from 'immutable';

@Injectable()
export class LoginService {

  //private loginUrl:string = "https://p4ucloud-mnforlenza.rhcloud.com/p4u/user/login";
  private loginUri:string = "p4u/user/login";
  private allUserUri:string = "p4u/user/all";
  
  constructor(private http:Http,
              private context:AppSettingsService) {}

  doLogin(email:string, pass: string):Observable<UserState> {
    let url = this.context.getServiceHostName() + this.loginUri + "/" + email + "/" + pass;

  	let body = "";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(url);
    return this.http.post(url, body, options)
    				.map(this.extractData)
    				.catch(this.handleError);
  }

  getAllUser() {
    let url = this.context.getServiceHostName() + this.allUserUri;
    console.log(url);
    return this.http.get(url)
            .map(this.extractUsers)
            .catch(this.handleError); 
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || { };
  }

  private extractUsers(res: Response) {
    let body = res.json();
    var users:User[] = body;
    return users || { };
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
