import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';


export class Amigo {
	_data: Map<string, any>;

	constructor(data: any = undefined) {
		data = data || { id: -1, name: "", cost: 0, uuid: UUID.UUID() };
		this._data = Map<string, any>(data);
	}

	getUuid() {
		return <string> this._data.get('uuid');
	}

	getId() {
		return <number> this._data.get("id");
	}
	getUsername() {
		return <string> this._data.get("username");
	}
	getFirstName() {
		return <number> this._data.get("firstName");
	}
	getLastName() {
		return <boolean> this._data.get("lastName");
	}

	

	setId(value:number) {
		return new Amigo(this._data.set('id', value));
	}
	setUsername(value:string) {
		return new Amigo(this._data.set('username', value));
	}
	setFirstName(value:string) {
		return new Amigo(this._data.set('firstName', value));
	}
	setLastName(value:string) {
		return new Amigo(this._data.set('lastName', value));
	}

}