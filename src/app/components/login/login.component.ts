import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  usuario = "";
  contrasenia ="";

  constructor(public router:Router){
  }

  ngOnInit(): void {
  }

  ingresar(){
  if (this.usuario === 'donna' && this.contrasenia === 'teamo') {
    localStorage.setItem('isLoggedIn', 'true');
    alert('Ingreso correctamente');
    this.router.navigate([""]);
  } else {
    alert('Ingreso fallo');
  }
  }



}
