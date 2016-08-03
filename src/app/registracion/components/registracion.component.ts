import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES} from '@angular2-material/card';
import { MdButton} from '@angular2-material/button';
import { MdInput } from '@angular2-material/input';
import { User } from '../../core/user';
import { UserState }     from '../../core/user-state';
import { RegistracionService } from '../services/registracion.service';
import { UserSettingsService } from '../../user-settings.service';
import { Router} from '@angular/router-deprecated';
import { MdToolbar } from '@angular2-material/toolbar';

@Component({
  moduleId: module.id,
  selector: 'app-registracion',
  templateUrl: 'registracion.component.html',
  styleUrls: ['registracion.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdInput,
    MdButton,
    MdToolbar
  ],
  providers: [RegistracionService]
})
export class RegistracionComponent implements OnInit {

  user: User;
  errorMessage:string;

  constructor(private userSettingsService:UserSettingsService,
              private registracionService:RegistracionService,
              private router:Router) {   
  }

  ngOnInit() {
  }

  registrar(nombre:string, apellido:string, direccion:string, fechaNacimiento:string, 
            email:string, password:string){    
    console.log("nombre: " + nombre);
    console.log("apellido: " + apellido);
    console.log("direccion: " + direccion);
    console.log("fechaNacimiento: " + fechaNacimiento);
    console.log("email: " + email);
    console.log("password: " + password);

    if (nombre == "") {
      this.errorMessage = "Debe completar el campo Nombre";
    } else if (apellido == "") {
      this.errorMessage = "Debe completar el campo Apellido";
    } else if (fechaNacimiento == "") {
      this.errorMessage = "Debe completar el campo Fecha de Nacimiento";
    } else if (email == "") {
      this.errorMessage = "Debe completar el campo Email";
    } else if (password == "") {
      this.errorMessage = "Debe completar el campo Contraseña";
    } else {
      this.user  = new User();
      this.user.email = email;
      this.user.username = email;
      this.user.password = password;
      this.user.facebookUserName = "";
      this.user.address = direccion;
      this.user.firstName = nombre;
      this.user.lastName = apellido;
      this.user.birthDate = fechaNacimiento;   

      this.registracionService.doRegistrar(this.user)
                          .subscribe(
                            userState => this.updateState(userState),
                            error =>  this.errorMessage = <any>error);  
    }
  }

  updateState(userState:UserState) {    
    this.userSettingsService.updateUserState(userState);
    let link = ['Vidriera'];
    this.router.navigate(link);
  }
}
