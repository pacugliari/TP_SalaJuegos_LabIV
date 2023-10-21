import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EncuestaService } from 'src/app/services/encuesta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta-respuestas',
  templateUrl: './encuesta-respuestas.component.html',
  styleUrls: ['./encuesta-respuestas.component.css']
})
export class EncuestaRespuestasComponent {

  columnas: string[] = ['usuario','fecha','nombre','apellido','edad','telefono','comoNosEncontraste',
  'cuantoGusto','cualesJugaste','recomendarias'];
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  lista : MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private encuestasServices:EncuestaService){}

  async ngOnInit(){
    this.lista.paginator = this.paginator
    await this.encuestasServices.obtenerEncuestas()
    .then((respuesta)=>{
      this.lista.data = respuesta.sort((a,b)=> Number(b.fecha) - Number( a.fecha));
    })
  }

  ver(reg:any){
    console.log(reg);
    let contenidoHTML = "<ul>";

    reg.forEach((juego:string) => {
      contenidoHTML += `<li>${juego}</li>`;
    });
    contenidoHTML += "</ul>";
    
    // Llama a SweetAlert con el contenido HTML
    Swal.fire({
      title: "Juegos jugados por el usuario:",
      html: contenidoHTML,
      icon: "info",
    });
  }
}
