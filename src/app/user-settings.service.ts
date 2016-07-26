import { Injectable } from '@angular/core';
import { UserState } from './core/user-state';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class UserSettingsService {

  public userState:UserState = new UserState();
  public userStateSource = new Subject<UserState>();
  userStateObs$ = this.userStateSource.asObservable();

  constructor() {}

  // Service message commands
  updateUserState(userState: UserState) {
    this.userState = userState;
    this.userStateSource.next(userState);
  }

}
