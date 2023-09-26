import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';



const routes: Routes = [
  {
    path: 'ahorcado',
    component: AhorcadoComponent,
  },
  {
    path: 'mayormenor',
    component: MayormenorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosRoutingModule { }
