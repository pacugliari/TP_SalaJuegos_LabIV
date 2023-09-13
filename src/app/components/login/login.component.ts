import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
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
              private mensajes: MensajesService,
              private firestore:Firestore){
  }

  ngOnInit(): void {
  }


  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    isChecked ? this.ingresoAnonimo = true : this.ingresoAnonimo = false;
  }

  generarFecha(){
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Añadir ceros a la izquierda si es necesario
    const day = today.getDate().toString().padStart(2, '0');
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const seconds = today.getSeconds().toString().padStart(2, '0');
    const milliseconds = today.getMilliseconds().toString().padStart(3, '0');

    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    return formattedDate;
  }

  agregarLog(usuario:any){

    let data = {
      fechaIngreso: this.generarFecha(),
      usuario: {
        uid : usuario.user.uid,
        email : usuario.user.email,
        displayName : usuario.user.displayName == null ? "" : usuario.user.displayName ,
        photoURL : usuario.user.photoURL
      }

    }
    const usuarioRef = collection(this.firestore,'log_usuarios');
    return addDoc(usuarioRef,data);
  }

  ingresar(){

    this.userService.login(this.ingresoAnonimo ? {email:"anonimo@anonimo.com",password:"40549113"} : this.formLogin.value)
    .then((usuario) =>{
      this.mensajes.informacion("Usuario autorizado");
      this.router.navigate(["home"])
      this.agregarLog(usuario);
    })
    .catch((error) => {
      this.mensajes.error("Usuario no autorizado");
      console.log(error);
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
