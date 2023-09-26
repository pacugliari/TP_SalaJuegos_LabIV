import { Component, ViewChild } from '@angular/core';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ChatComponent) chat?: ChatComponent;

  ocultarChatLogout(evento: any){
    if(this.chat?.chatExpanded && evento)
      this.chat.toggleChat();
  }
}
