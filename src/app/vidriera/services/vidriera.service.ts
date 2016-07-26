import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Articulo } from '../components/articulo';
import { Producto } from '../../core/producto';
import { Observable }     from 'rxjs/Observable';
import { List, Map } from 'immutable';



@Injectable()
export class VidrieraService {

  private articulosUrl = "https://p4ucloud-mnforlenza.rhcloud.com/p4u/present/all";
  private articulosPorUserUrl = "https://p4ucloud-mnforlenza.rhcloud.com/p4u/present/by-user/";

  constructor(private http:Http) {}

  public getArticulos(): Observable<Articulo[]> {
  	return this.http.get(this.articulosUrl)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  public getProductos(): Observable< List<Producto> > {
    return this.http.get(this.articulosUrl)
                  .map(this.parseProductos)
                  .catch(this.handleError);
  }

  public getProductosByUser(idUser:string):Observable< List<Producto> > {
    let url = this.articulosPorUserUrl + idUser;
    return this.http.get(url)
                  .map(this.parseProductos)
                  .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private parseProductos(res: Response) {
    let body = res.json();
    let productos = List<Producto>();
    for (var producto of body) {
      var item = new Producto(producto); 
      productos = productos.push(item);
    }
    return productos || { };
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
