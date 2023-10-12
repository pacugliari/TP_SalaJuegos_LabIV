import { Injectable } from '@angular/core';
import { Firestore, getDocs, collection ,addDoc,query, orderBy,onSnapshot } from '@angular/fire/firestore';
import { authState,updateProfile,getAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Puntaje } from '../models/puntaje';

@Injectable({
  providedIn: 'root'
})
export class PuntajesService {
  user$?: Observable<any | null>;
  puntajes : Puntaje[]=[];

  constructor(private firestore : Firestore) {
    getAuth().onAuthStateChanged(()=>{
      this.user$ = new Observable((observer)=> {
        observer.next(getAuth().currentUser);
      });
    });
   }

   private async obtenerUsuario () : Promise<any> {
    return new Promise((resolve,reject)=>{
      this.user$?.subscribe(async (data) => {
        resolve(data);
      });
    })

  }

  async guardarPuntaje(puntaje:number,juego:string){
    let usuario = await this.obtenerUsuario();
    let data = {
      usuario : usuario.displayName ? usuario.displayName : usuario.email,
      fecha: new Date().getTime(),
      puntaje: puntaje,
      juego: juego
    }
    const usuarioRef = collection(this.firestore,'puntajes');
    return addDoc(usuarioRef,data);
  }

  async obtenerPuntajes(juego:string){
    this.puntajes = []
    const querySnapshot = await getDocs(collection(this.firestore, "puntajes"));
    querySnapshot.forEach((doc) => {
      let puntaje = doc.data() as Puntaje;
      puntaje.id = doc.id
      this.puntajes.push(puntaje);
    });
    this.puntajes = this.puntajes.filter((element)=> element.juego === juego);
    return this.puntajes;
  }
}
