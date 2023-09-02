import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formLogin = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private router:Router,
              private formBuilder: FormBuilder,
              private userService: UserService){
  }

  ngOnInit(): void {
  }

  ingresar(){
    this.userService.login(this.formLogin.value)
    .then(response =>{
      console.log(response);
      this.router.navigate(["home"])
    })
    .catch(error => console.log(error))
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
