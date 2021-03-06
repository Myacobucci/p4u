import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';


export class Producto {
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
	getName() {
		return <string> this._data.get("name");
	}
	getCost() {
		return <number> this._data.get("cost");
	}
	getFree() {
		return <boolean> this._data.get("free");
	}
	getStock() {
		return <number> this._data.get("stock");
	}
	getBrand() {
		return <string> this._data.get("brand");
	}
	getImageFileName() {
		return <string> this._data.get("imageFileName");
	}

	

	setId(value:number) {
		return new Producto(this._data.set('id', value));
	}
	setName(value:string) {
		return new Producto(this._data.set('name', value));
	}
	setCost(value:number) {
		return new Producto(this._data.set('cost', value));
	}
	setFree(value:number) {
		return new Producto(this._data.set('free', value));
	}
	setStock(value:number) {
		return new Producto(this._data.set('free', value));
	}
	setBrand(value:string) {
		return new Producto(this._data.set('brand', value));
	}
	setImageFileName(value:string) {
		return new Producto(this._data.set('imageFileName', value));
	}

}