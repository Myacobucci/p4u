import { Injectable } from '@angular/core';
import { UserState } from './core/user-state';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class UserSettingsService {

  public userStateSource = new Subject<UserState>();
  userStateObs$ = this.userStateSource.asObservable();

  constructor() {}

  // Service message commands
  updateUserState(userState: UserState) {
  	console.log("Me acualizaron");
  	console.log(userState);
    this.userStateSource.next(userState);
    console.log("Y despues?");
    console.log(this.userStateSource.observers);
  }

}
