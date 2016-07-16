import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Articulo } from '../components/articulo';
import { Observable }     from 'rxjs/Observable';



@Injectable()
export class VidrieraService {

  private articulosUrl = "http://p4ucloud-mnforlenza.rhcloud.com/p4u/present/all";

  constructor(private http:Http) {}

  public getArticulos(): Observable<Articulo[]> {
  	return this.http.get(this.articulosUrl)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.debug(body);
    return body || { };
  }


  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  articulos: Object[] = [
    {nombre: "Lapicera", precio: 10, rubro: "Libreria"},
    {nombre: "Lapicera", precio: 10, rubro: "Libreria"},
    {nombre: "Lapicera", precio: 10, rubro: "Libreria"},
    {nombre: "Lapicera", precio: 10, rubro: "Libreria"},
    {nombre: "Lapicera", precio: 10, rubro: "Libreria"},
    {nombre: "Lapicera", precio: 10, rubro: "Libreria"},
    {nombre: "Lapicera", precio: 10, rubro: "Libreria"},
    {nombre: "Alfajor", precio: 10, rubro: "Gastronomia"},
    {nombre: "Alfajor", precio: 10, rubro: "Gastronomia"},
    {nombre: "Alfajor", precio: 10, rubro: "Gastronomia"},
    {nombre: "Alfajor", precio: 10, rubro: "Gastronomia"},
    {nombre: "Alfajor", precio: 10, rubro: "Gastronomia"},
    {nombre: "Alfajor", precio: 10, rubro: "Gastronomia"},
    {nombre: "Alfajor", precio: 10, rubro: "Gastronomia"},
    {nombre: "Entradas", precio: 10, rubro: "Entretenimiento"},
    {nombre: "Entradas", precio: 10, rubro: "Entretenimiento"},
    {nombre: "Entradas", precio: 10, rubro: "Entretenimiento"},
    {nombre: "Entradas", precio: 10, rubro: "Entretenimiento"},
    {nombre: "Entradas", precio: 10, rubro: "Entretenimiento"},
    {nombre: "Entradas", precio: 10, rubro: "Entretenimiento"},
    {nombre: "Entradas", precio: 10, rubro: "Entretenimiento"},
   
  ];

}
