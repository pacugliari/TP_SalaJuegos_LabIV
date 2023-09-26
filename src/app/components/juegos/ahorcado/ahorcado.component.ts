import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {

  title = "Ahorcado";
  palabraOculta = "";
  intentos = 0;
  gano = false;
  perdio = false;
  letras = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];

   palabras: string[] = [
    "Manzana",
    "Perro",
    "Gato",
    "Casa",
    "Sol",
    "Arbol",
    "Computadora",
    "Pelota",
    "Montana",
    "Libro",
    "Guitarra",
    "Pintura",
    "Jirafa",
    "Elefante",
    "Chocolate",
    "Pizza",
    "Rio",
    "Avion",
    "Barco",
    "Telefono",
    "Camara",
    "Luna",
    "Estrella",
    "Camisa",
    "Pantalon",
    "Zapatos",
    "Sombrero",
    "Reloj",
    "Calcetines",
    "Flor",
    "Silla",
    "Mesa",
    "Tren",
    "Globo",
    "Helado",
    "Mariposa",
    "Dinosaurio",
    "Helicoptero",
    "Pescado",
    "Tortuga",
    "Platano",
    "Heladera",
    "Radio",
    "Espejo",
    "Guitarra",
    "Teclado",
    "Escalera",
    "Piano",
    "Sirena",
    "Cepillo"    
  ];
  palabra = this.palabraAleatoria();
  
   palabraAleatoria(): string {
    const indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[indiceAleatorio];
  }

  constructor(private router :Router) {
    this.palabraOculta = "_ ".repeat(this.palabra.length);
  }
  comprobar(letra:any) {
    this.existeLetra(letra);
    const palabraOcultaArreglo = this.palabraOculta.split(" ");

    for (let i = 0; i <= this.palabra.length; i++) {
      if (this.palabra[i] === letra) {
        palabraOcultaArreglo[i] = letra;
      }
    }
    this.palabraOculta = palabraOcultaArreglo.join(" ");
    this.verificaGanador();
  }
  verificaGanador() {
    const palabraArr = this.palabraOculta.split(" ");
    const palabraEvaluar = palabraArr.join("");

    if (palabraEvaluar === this.palabra) {
      this.gano = true;
      Swal.fire({
        icon: 'success',
        title: 'Felicidades! Ganaste!!! 😁',
      })
    }
    if (this.intentos === 9) {
      this.perdio = true;
      Swal.fire({
        icon: 'error',
        title: 'Lo siento 😭 Perdiste!',
        html: 'La palabra correcta era: <b>'+this.palabra+"</b>"
      })
    }
  }

  existeLetra(letra:any) {
    if (this.palabra.indexOf(letra) >= 0) {
      //console.log("La letra existe" + letra);
    } else {
      this.intentos++;
    }
  }
  
  empezarNuevoJuego(){
    this.router.navigateByUrl('/refreshAhorcado', {skipLocationChange: true}).then(()=> this.router.navigate(["juegos/ahorcado"]));
  }
}
