import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Auth,authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  user$: Observable<any | null>;

  constructor(private router:Router,
              private userService:UserService,
              private afAuth: Auth) {
      this.user$ = authState(afAuth)
   }


   ngOnInit() {
    
  }


  ir(ruta : string) {
    this.router.navigate([ruta]);
  }


  async logout(){
    this.userService.logout()
    .then(response =>{
      this.router.navigate(["login"]);
    })
    .catch(error => console.log(error))
    this.userService.logout();
  }
  
}
