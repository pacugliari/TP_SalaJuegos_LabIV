import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { AtrapalafrutaComponent } from './atrapalafruta/atrapalafruta.component';



const routes: Routes = [
  {
    path: 'ahorcado',
    component: AhorcadoComponent,
  },
  {
    path: 'mayormenor',
    component: MayormenorComponent,
  },
  {
    path: 'preguntados',
    component: PreguntadosComponent,
  },
  {
    path: 'atrapalafruta',
    component: AtrapalafrutaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosRoutingModule { }
