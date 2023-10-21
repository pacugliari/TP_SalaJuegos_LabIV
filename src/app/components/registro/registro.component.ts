import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formReg = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]],
    verifyPassword: ['', [Validators.required,Validators.minLength(6)]]
  });

  constructor(private formBuilder: FormBuilder,
              private mensajes: MensajesService,
              private userService: UserService,
              private router: Router){

  }

  hasRequiredError(): boolean | undefined{
    const emailControl = this.formReg.get('email');
    const passwordControl = this.formReg.get('password');
    const verifyPasswordControl = this.formReg.get('verifyPassword');

    return (
      (emailControl?.touched && emailControl.hasError('required')) ||
      (passwordControl?.touched && passwordControl.hasError('required')) ||
      (verifyPasswordControl?.touched && verifyPasswordControl.hasError('required'))
    );
  }

  verificarPasswords(){
    return this.formReg.get("password")?.value === this.formReg.get("verifyPassword")?.value ;
  }

  irLogin(){
    this.router.navigate(["login"]);
  }

  async registrar(){
    if(this.verificarPasswords()){
      await this.userService.register(this.formReg.value)
      .then(async response =>{
        await this.userService.login(this.formReg.value)    
          .then(() =>{
            this.mensajes.informacion("Usuario autorizado");
            this.router.navigate(["home"])
          })
          .catch((error) => {
            this.mensajes.error("Usuario no autorizado");
          })
      })
      .catch(error => {
        if(error.code === "auth/email-already-in-use"){
          this.mensajes.error("El usuario ya se encuentra registrado")
        }
      })
    }else
      this.mensajes.error("Las contraseñas no son iguales");
  }
}
