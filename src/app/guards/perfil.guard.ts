import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { getAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilGuard implements CanActivate {
  constructor(private router: Router,private usuariosServices:UserService) {
    getAuth().onAuthStateChanged(()=>{
      this.user$ = new Observable((observer)=> {
        observer.next(getAuth().currentUser);
      });
    });
  }

  user$?: Observable<any | null>;
  respuesta : boolean = false;
   private async obtenerUsuario () : Promise<any> {
    return new Promise((resolve,reject)=>{
      this.user$?.subscribe(async (data) => {
        resolve(data);
      });
    })
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    this.respuesta = false;
    
    
   await this.usuariosServices.obtenerRoles().then(async (respuesta)=>{
      respuesta.forEach(async element => {
        let usuarioActual = (await this.obtenerUsuario());
        if(element.usuario.user.uid === usuarioActual.uid){
          if(element.rol === 'administrador'){
            this.respuesta =  true;
          }
        }
      });
    })

    if(!this.respuesta){
      await Swal.fire("","Usuario no autorizado","error")
      this.router.navigate(['/home']);
    }

    return this.respuesta;
  }
}