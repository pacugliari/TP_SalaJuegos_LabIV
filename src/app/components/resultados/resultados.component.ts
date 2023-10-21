import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Puntaje } from 'src/app/models/puntaje';
import { PuntajesService } from 'src/app/services/puntajes.service';
import { TablaPuntajesComponent } from '../tabla-puntajes/tabla-puntajes.component';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  mostrarGif: boolean = false;
  @ViewChild("tablaMayorMenor") tablaMayorMenor!: TablaPuntajesComponent;
  @ViewChild("tablaAhorcado") tablaAhorcado!: TablaPuntajesComponent;
  @ViewChild("tablaPreguntados") tablaPreguntados!: TablaPuntajesComponent;
  @ViewChild("tablaAtrapaFruta") tablaAtrapaFruta!: TablaPuntajesComponent;

  indice = 0;
  puntajesMayorMenor : any;
  puntajesAhorcado : any;
  puntajesPreguntados : any;
  puntajesFruta : any;

  constructor(private puntajeService:PuntajesService){

  }

  async ngOnInit(){
    this.mostrarGif = true;

    await this.puntajeService.obtenerPuntajes("MayorMenor")
    .then((respuesta)=>{
      this.puntajesMayorMenor = respuesta.sort((a,b)=> Number(b.fecha) - Number( a.fecha));
    })

    await this.puntajeService.obtenerPuntajes("Ahorcado")
    .then((respuesta)=>{
      this.puntajesAhorcado = respuesta.sort((a,b)=> Number(b.fecha) - Number( a.fecha));
    })

    await this.puntajeService.obtenerPuntajes("Preguntados")
    .then((respuesta)=>{
      this.puntajesPreguntados = respuesta.sort((a,b)=> Number(b.fecha) - Number( a.fecha));
    })

    await this.puntajeService.obtenerPuntajes("AtrapaFruta")
    .then((respuesta)=>{
      this.puntajesFruta = respuesta.sort((a,b)=> Number(b.fecha) - Number( a.fecha));
    })

    this.mostrarGif = false;
    this.tablaMayorMenor.actualizar(this.puntajesMayorMenor);
    this.tablaAhorcado.actualizar(this.puntajesAhorcado);
    this.tablaPreguntados.actualizar(this.puntajesPreguntados);
    this.tablaAtrapaFruta.actualizar(this.puntajesFruta);
  }
}
