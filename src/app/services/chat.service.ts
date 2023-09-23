import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, getDocs, collection ,addDoc,query, orderBy,onSnapshot } from '@angular/fire/firestore';
import Chat from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  listaChat:Chat[] = [];


  constructor(private firestore : Firestore,private router:Router) {
    
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

    const formattedDate = `${hours}:${minutes}:${seconds}-${day}-${month}-${year} `;
    return formattedDate;
  }

  agregarMensaje(usuario:any,mensaje:string){
    let data = {
      uid : usuario.uid,
      fecha: this.generarFecha(),
      mensaje: mensaje,
      nombre: usuario.displayName
    }
    const usuarioRef = collection(this.firestore,'chat');
    return addDoc(usuarioRef,data);
  }

   async traerChatsBase() {
    this.listaChat = [];
    const q = query(collection(this.firestore, "chat"), orderBy("fecha", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let chat = doc.data() as Chat;
      this.listaChat.push(chat);
    });
    
  }

  listenToChatChanges() {
    this.listaChat = [];
    const q = query(collection(this.firestore, "chat"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.listaChat = [];
      querySnapshot.forEach((doc) => {
        let chat = doc.data() as Chat;
        this.listaChat.push(chat);
      });
    });
  }

}
