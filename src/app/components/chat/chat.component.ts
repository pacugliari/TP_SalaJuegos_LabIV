import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { authState,updateProfile,getAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';
import Chat from 'src/app/models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user$?: Observable<any | null>;
  listaMensajes:Chat[] = [];
  usuario: any;
  mensaje:string = "";
  chatExpanded: boolean = false; // Inicialmente, el chat está expandido

  constructor(public chatService:ChatService){
    getAuth().onAuthStateChanged(()=>{
      this.user$ = new Observable((observer)=> {
        observer.next(getAuth().currentUser);
      });
    });
    
  }

  private async obtenerUidUser() : Promise<any> {
    return new Promise((resolve,reject)=>{
      this.user$?.subscribe(async (data) => {
        resolve(data);
      });
    })

  }
  
  async ngOnInit() {

  }



  async toggleChat() {
    this.chatExpanded = !this.chatExpanded; // Cambia el estado de colapso/expansión del chat
    if(this.chatExpanded){
      this.usuario = await this.obtenerUidUser();
      this.chatService.listenToChatChanges();
    }
  }

  enviar(){
    if(this.mensaje !== ""){
      this.chatService.agregarMensaje(this.usuario,this.mensaje);
      this.mensaje="";
    }

  }
}
