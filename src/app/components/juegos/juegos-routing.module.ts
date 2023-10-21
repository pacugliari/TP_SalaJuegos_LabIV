import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { AtrapalafrutaComponent } from './atrapalafruta/atrapalafruta.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';



const routes: Routes = [
  {
    path: 'ahorcado',
    component: AhorcadoComponent,...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'mayormenor',
    component: MayormenorComponent,...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'preguntados',
    component: PreguntadosComponent,...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'atrapalafruta',
    component: AtrapalafrutaComponent,...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosRoutingModule { }
