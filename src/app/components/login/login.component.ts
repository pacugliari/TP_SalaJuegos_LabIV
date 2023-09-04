import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  ingresoAnonimo : boolean = false;

  formLogin = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]],
  });

  constructor(private router:Router,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private mensajes: MensajesService){
  }

  ngOnInit(): void {
  }


  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    isChecked ? this.ingresoAnonimo = true : this.ingresoAnonimo = false;
  }

  ingresar(){

    this.userService.login(this.ingresoAnonimo ? {email:"anonimo@anonimo.com",password:"40549113"} : this.formLogin.value)
    .then(() =>{
      this.mensajes.informacion("Usuario autorizado");
      this.router.navigate(["home"])
    })
    .catch((error) => {
      this.mensajes.error("Usuario no autorizado");
    })
  }

  hasRequiredError(): boolean | undefined{
    const emailControl = this.formLogin.get('email');
    const passwordControl = this.formLogin.get('password');

    return (
      (emailControl?.touched && emailControl.hasError('required')) ||
      (passwordControl?.touched && passwordControl.hasError('required'))
    );
  }

  irRegistro(){
    this.router.navigate(["registro"]);
  }



}
