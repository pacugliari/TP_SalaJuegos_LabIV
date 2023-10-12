import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/registro/registro.component';
import { canActivate, redirectUnauthorizedTo,redirectLoggedInTo } from '@angular/fire/auth-guard'
import { ErrorComponent } from './components/error/error.component';
import { ResultadosComponent } from './components/resultados/resultados.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent,...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  { path: 'login', component: LoginComponent,...canActivate(()=> redirectLoggedInTo(['/home']))},
  { path: 'registro', component: RegistroComponent,...canActivate(()=> redirectLoggedInTo(['/home']))},
  { path: 'quien_soy', component: QuienSoyComponent,...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  { path: 'resultados', component: ResultadosComponent,...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  { path: 'juegos', loadChildren: () => import('./components/juegos/juegos.module').then(m => m.JuegosModule) },
  { path: '**', component: ErrorComponent },// ** : RUTA POR DEFECTO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
