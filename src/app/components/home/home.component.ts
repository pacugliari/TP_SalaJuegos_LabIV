import { Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

 cards = [
    { title: 'Ahorcado', image: '../../../assets/ahorcado.png' },
    { title: 'Mayor o menor', image: '../../../assets/mayorMenor.png' },
    { title: 'Preguntados', image: '../../../assets/preguntados.png' },
    { title: 'Atrapa la fruta', image: '../../../assets/atrapaFruta.png' }
  ];
  


}
