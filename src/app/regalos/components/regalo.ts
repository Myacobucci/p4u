import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';


export class Regalo {
	_data: Map<string, any>;
	_data2: Map<string, any>;
	_data3: Map<string, any>;
	_data4: Map<string, any>;

	constructor(data: any = undefined) {
		data = data || { id: -1, name: "", cost: 0, uuid: UUID.UUID() };
		this._data = Map<string, any>(data);
	}

	getUuid() {
		return <string> this._data.get('uuid');
	}

	getId() {
		let data2 = this._data.get("item") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data2 = Map<string, any>(data2);
		return <number> this._data2.get("presentId");
	}

	getExpired() {
		return <boolean> this._data.get("expired");
	}

	getItemId() {
		let data3 = this._data.get("id") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data3 = Map<string, any>(data3);
		return <number> this._data3.get("itemId");
	}

	getName() {
		let data2 = this._data.get("item") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data2 = Map<string, any>(data2);
		let data4 = this._data2.get("present") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data4 = Map<string, any>(data4);
		return <string> this._data4.get("name");
	}
	getBrand() {
		let data2 = this._data.get("item") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data2 = Map<string, any>(data2);
		let data4 = this._data2.get("present") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data4 = Map<string, any>(data4);
		return <string> this._data4.get("brand");
	}
	getType() {
		let data2 = this._data.get("item") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data2 = Map<string, any>(data2);
		let data4 = this._data2.get("present") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data4 = Map<string, any>(data4);
		return <string> this._data4.get("type");
	}
	getState() {
		let data2 = this._data.get("item") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data2 = Map<string, any>(data2);
		return <string> this._data2.get("state");
	}
	getCodigo() {
		let data2 = this._data.get("item") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data2 = Map<string, any>(data2);
		return <string> this._data2.get("presentCode");
	}
	getImageFileName() {
		let data2 = this._data.get("item") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data2 = Map<string, any>(data2);
		let data4 = this._data2.get("present") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data4 = Map<string, any>(data4);
		return <string> this._data4.get("imageFileName");
	}
	
	setItemId(value:number) {
		return new Regalo(this._data.set('id', value));
	}
	
	setName(value:string) {
		return new Regalo(this._data.set('name', value));
	}
	
	getSender() {
		return <boolean> this._data.get("sender");
	}
}