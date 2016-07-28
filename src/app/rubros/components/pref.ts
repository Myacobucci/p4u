import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';


export class Pref {
	_data: Map<string, any>;
	description: string;
	aux: string;
	id: number;

	constructor(data: any = undefined) {
		data = data || { id: -1, name: "", cost: 0, uuid: UUID.UUID() };
		this._data = Map<string, any>(data);
		this.description = "true";
		this.aux = "false";
		this.id = this.getId();
	}

	getUuid() {
		return <string> this._data.get('uuid');
	}

	getId() {
		return <number> this._data.get("id");
	}
	getName() {
		return <string> this._data.get("name");
	}
	

	

	setId(value:number) {
		return new Pref(this._data.set('id', value));
	}
	setName(value:string) {
		return new Pref(this._data.set('name', value));
	}
	

}