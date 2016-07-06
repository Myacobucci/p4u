import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';



@Component({
  moduleId: module.id,
  selector: 'app-vidriera',
  templateUrl: 'vidriera.component.html',
  styleUrls: ['vidriera.component.css'],
  directives: [
  	MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES
  ],
})
export class VidrieraComponent implements OnInit {

  constructor() {}


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

  ngOnInit() {
  }

}
