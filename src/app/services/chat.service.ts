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
      nombre: usuario.displayName ? usuario.displayName : usuario.email
    }
    const usuarioRef = collection(this.firestore,'chat');
    return addDoc(usuarioRef,data);
  }

   /*async traerChatsBase() {
    this.listaChat = [];
    const q = query(collection(this.firestore, "chat"), orderBy("fecha", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let chat = doc.data() as Chat;
      this.listaChat.push(chat);
    });
    
  }*/

  listenToChatChanges() {
    this.listaChat = [];
    const q = query(collection(this.firestore, "chat"));//,orderBy("fecha", "desc")
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.listaChat = [];
      querySnapshot.forEach((doc) => {
        let chat = doc.data() as Chat;
        this.listaChat.push(chat);
      });
      this.ordenarChats();
    });
    
  }

  private ordenarChats(){
    // Ordenar los chats por fecha
    this.listaChat.sort((chatA, chatB) => {

      const dateA = this.parseDateFromString(chatA.fecha);
      const dateB = this.parseDateFromString(chatB.fecha);

      // Manejo de fechas nulas
      if (dateA === null && dateB === null) {
        return 0; // Ambas fechas son nulas, considerar iguales
      } else if (dateA === null) {
        return 1; // dateA es nula, dateB es mayor (coloca dateA al final)
      } else if (dateB === null) {
        return -1; // dateB es nula, dateA es mayor (coloca dateB al final)
      } else {
        return dateB.getTime()-dateA.getTime();
      }
      });
  }

  private parseDateFromString(dateStr: string): Date | null {
    const [time, day, month, year] = dateStr.split('-');
    const [hour, minute, second] = time.split(':');
    
    // El constructor de Date espera el formato: año, mes (0-11), día, hora, minuto, segundo, milisegundo
    const parsedDate = new Date(
      parseInt(year),
      parseInt(month) - 1, // Restamos 1 al mes ya que en JavaScript los meses van de 0 a 11
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    );
  
    // Verificar si la fecha es válida
    if (isNaN(parsedDate.getTime())) {
      return null; // La fecha no es válida
    }
  
    return parsedDate;
  }



}
