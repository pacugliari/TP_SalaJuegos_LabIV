import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { authState,updateProfile,getAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { MensajesService } from 'src/app/services/mensajes.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  user$?: Observable<any | null>;
  nombreModificado = "";

  constructor(private router:Router,
              private userService:UserService,
              private mensajes: MensajesService) {  

      getAuth().onAuthStateChanged(()=>{
        this.user$ = new Observable((observer)=> {
          observer.next(getAuth().currentUser);
        });
      });


   }


   ngOnInit() {

  }


  ir(ruta : string) {
    this.router.navigate([ruta]);
  }

  async logout(){
    this.userService.logout()
    .then(response =>{
      this.nombreModificado = "";
      this.router.navigate(["login"]);
    })
    .catch(error => console.log(error))

  }

  async modificarNombre(){
    let usuario = await this.obtenerUser();
    if(this.nombreModificado !== ""){
      await updateProfile(usuario,{displayName: this.nombreModificado})
      .then(() => {
        this.mensajes.informacion("Nombre de perfil modificado")
      })
    }
  }

  async obtenerUser() : Promise<any> {
    return new Promise((resolve,reject)=>{
      this.user$?.subscribe(async (data) => {
        resolve(data);
      });
    })

  }

   async cambiarIcono(){
      let usuario = await this.obtenerUser();
      const hash = Date.now();

      let foto = `https://www.gravatar.com/avatar/${hash}.jpg?d=identicon`;

      await updateProfile(usuario,{photoURL: foto })
        .then(() => {
          this.mensajes.informacion("Foto de perfil modificada")
      })

  }
  
}

