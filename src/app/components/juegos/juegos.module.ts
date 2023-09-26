import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { JuegosRoutingModule } from './juegos-routing.module';



@NgModule({
  declarations: [
    AhorcadoComponent,
    MayormenorComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
