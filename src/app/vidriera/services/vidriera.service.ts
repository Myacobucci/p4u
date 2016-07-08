import { Injectable } from '@angular/core';

@Injectable()
export class VidrieraService {

  constructor() {}

  public getArticulos() {
  	return this.articulos;
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
