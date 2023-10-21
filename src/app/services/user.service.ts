import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Firestore, addDoc, collection, getDocs } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class UserService{

    roles : any[]=[];
    constructor(private auth: Auth,private firestore:Firestore){

    }

    private async asignarRol (usuario:any){
    
        let data = {
          usuario : JSON.stringify(usuario),
          fecha: new Date().getTime(),
          rol: "usuario"
        }
        const usuarioRef = collection(this.firestore,'usuarios');
        return addDoc(usuarioRef,data);
    }

    async obtenerRoles (){
        this.roles = []
        const querySnapshot = await getDocs(collection(this.firestore, "usuarios"));
        querySnapshot.forEach((doc) => {
          let usuarioBase = doc.data() as any;
          let usuario = {
            fecha: usuarioBase.fecha,
            rol: usuarioBase.rol,
            usuario: JSON.parse(usuarioBase.usuario)
          }
          this.roles.push(usuario);
        });
        return this.roles;
      }

    async register({email,password}:any){
        let usuario =  await createUserWithEmailAndPassword(this.auth,email,password);
        return this.asignarRol(usuario);
    }

    login({email,password}:any){
        return signInWithEmailAndPassword(this.auth,email,password);
    }

    logout(){
        return signOut(this.auth);
    }
}