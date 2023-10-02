import { Component } from '@angular/core';
import { PerrosService } from 'src/app/services/perros.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent {

  opcionUno ?: string;
  opcionDos ?: string;
  imagen ?: string;

  constructor(private perrosService:PerrosService){
    let opciones = this.perrosService.TraerOpciones();
    this.opcionUno = opciones[0];
    this.opcionDos = opciones[1];

    this.perrosService.TraerImagenPerro(this.opcionUno).subscribe((respuesta : any)=>{
      if(respuesta.status === "success"){
        this.imagen = respuesta.message;
      }
    })
    //console.log(this.perrosService.TraerOpciones());

  }
}
