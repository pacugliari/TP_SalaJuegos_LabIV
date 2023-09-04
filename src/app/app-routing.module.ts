import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/registro/registro.component';
import { canActivate, redirectUnauthorizedTo,redirectLoggedInTo } from '@angular/fire/auth-guard'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent,...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  { path: 'login', component: LoginComponent,...canActivate(()=> redirectLoggedInTo(['/home']))},
  { path: 'registro', component: RegistroComponent,...canActivate(()=> redirectLoggedInTo(['/home']))},
  { path: 'quien_soy', component: QuienSoyComponent,...canActivate(()=> redirectUnauthorizedTo(['/login']))},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
