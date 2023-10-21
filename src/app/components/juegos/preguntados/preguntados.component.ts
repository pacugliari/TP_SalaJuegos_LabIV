import { Component } from '@angular/core';
import { PerrosService } from 'src/app/services/perros.service';
import { PuntajesService } from 'src/app/services/puntajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent {

  opcionUno ?: string;
  opcionDos ?: string;
  opcionTres ?: string;
  opcionCuatro ?: string;
  imagen ?: string;
  opciones : string[]=[];
  opcionCorrecta ?: string;
  puntaje : number = 0;

  constructor(private perrosService:PerrosService,private puntajesService: PuntajesService){
    this.pasarProximaPregunta();
    //console.log(this.perrosService.TraerOpciones());
  }

  verificarRespuesta(opcion:any) {
    let opcionCorrecta = this.opcionCorrecta?.replace('/','-').toUpperCase();
    if(opcion === opcionCorrecta ){
      Swal.fire({
        icon: 'success',
        title: 'Opcion correcta 😁',
        html: 'Sumanste un punto'
      })
      this.puntaje++;
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Opcion incorrecta 😭',
        html: 'La respuesta correcta es: <b>'+opcionCorrecta+"</b>"
      })
    }
    this.pasarProximaPregunta();
  }

  async guardarPuntaje(){
    this.puntaje = await this.puntajesService.guardarPuntaje(this.puntaje,"AtrapaFruta");
  }

  pasarProximaPregunta() {
    this.opciones = this.perrosService.TraerOpciones();
    this.opcionUno = this.opciones[0].replace('/','-').toUpperCase();
    this.opcionDos = this.opciones[1].replace('/','-').toUpperCase();
    this.opcionTres = this.opciones[2].replace('/','-').toUpperCase();
    this.opcionCuatro = this.opciones[3].replace('/','-').toUpperCase();

    const opcionAleatoria = Math.floor(Math.random() * this.opciones.length);

    this.opcionCorrecta = this.opciones[opcionAleatoria];

    this.perrosService.TraerImagenPerro(this.opcionCorrecta).subscribe((respuesta : any)=>{
      if(respuesta.status === "success"){
        this.imagen = respuesta.message;
      }
    })
  }
}
