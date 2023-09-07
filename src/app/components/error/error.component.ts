import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  error = "404";
  mensajeError = "La pagina que esta buscando no existe"

  constructor(private router:Router){

  }

  irHome(){
    this.router.navigate(["home"]);
  }
}
