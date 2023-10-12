import { Component } from '@angular/core';
import { Puntaje } from 'src/app/models/puntaje';
import { PuntajesService } from 'src/app/services/puntajes.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {
  puntajes : Puntaje[]=[];
  juego: string = "Mayor o menor"
  
  constructor(private puntajeService:PuntajesService){
    this.puntajeService.obtenerPuntajes("MayorMenor")
      .then((respuesta)=>{
        this.puntajes = respuesta;
      })
  }
}
