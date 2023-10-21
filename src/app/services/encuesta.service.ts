import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Puntaje } from '../models/puntaje';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  user$?: Observable<any | null>;
  puntajes : Puntaje[]=[];
  puntaje : number = 0;

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

  async obtenerEncuestas (){
    let encuestas : any[]= []
    const querySnapshot = await getDocs(collection(this.firestore, "encuestas"));
    querySnapshot.forEach((doc) => {
      let encuestaBase = doc.data() as any;
      let encuesta = {
        encuesta: JSON.parse(encuestaBase.encuesta),
        fecha:encuestaBase.fecha,
        usuario:encuestaBase.usuario
      }
      encuestas.push(encuesta);
    });
    return encuestas;
  }


   async enviar(encuesta: any){
    let usuario = await this.obtenerUsuario();

    let data = {
      usuario : usuario.displayName ? usuario.displayName : usuario.email,
      fecha: new Date().getTime(),
      encuesta: JSON.stringify(encuesta)
    }
    const usuarioRef = collection(this.firestore,'encuestas');
    return addDoc(usuarioRef,data);
    }
}


