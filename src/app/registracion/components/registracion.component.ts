import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES} from '@angular2-material/card';
import { MdButton} from '@angular2-material/button';
import { MdInput } from '@angular2-material/input';


@Component({
  moduleId: module.id,
  selector: 'app-registracion',
  templateUrl: 'registracion.component.html',
  styleUrls: ['registracion.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdInput,
    MdButton
  ]
})
export class RegistracionComponent implements OnInit {

  constructor() {   
  }

  ngOnInit() {
  }

  registrar(nombre:string, fechaNacimiento:string, email:string, password:string){    
    console.log("nombre: " + nombre);
    console.log("fechaNacimiento: " + fechaNacimiento);
    console.log("email: " + email);
    console.log("password: " + password);
  }
}
