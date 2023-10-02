import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { JuegosRoutingModule } from './juegos-routing.module';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { AtrapalafrutaComponent } from './atrapalafruta/atrapalafruta.component';



@NgModule({
  declarations: [
    AhorcadoComponent,
    MayormenorComponent,
    PreguntadosComponent,
    AtrapalafrutaComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
