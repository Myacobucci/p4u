import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';

export class Notificacion {

	_data: Map<string, any>;	

	constructor(data: any = undefined) {
		data = data || { itemId: -1, sender: "", uuid: UUID.UUID() };
		this._data = Map<string, any>(data);
	}

	getUuid() {
		return <string> this._data.get('uuid');
	}

	getSender() {
		return <string> this._data.get("sender");		
	}
}
