import { User } from "./user";
export class UserState {
	logged:boolean;
	user: User;

	constructor() {
    	this.logged = false;	
    }
}