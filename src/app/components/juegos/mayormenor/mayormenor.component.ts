import { Component } from '@angular/core';

interface Carta {
  numero: number;
  palo: string;
}

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.css']
})
export class MayormenorComponent {
  mazo: Carta[] = [];
  cartaActual?: Carta;
  cartaSiguiente?: Carta;
  resultado?: string;

  constructor() { }

  ngOnInit(): void {
    this.crearMazo();
    this.iniciarJuego();
  }

  crearMazo() {
    const palos = ['basto', 'oro', 'copa', 'espada'];
    for (let numero = 1; numero <= 12; numero++) {
      for (const palo of palos) {
        this.mazo.push({ numero, palo });
      }
    }
  }

  iniciarJuego() {
    this.cartaActual = this.obtenerCartaAleatoria();
    this.cartaSiguiente = this.obtenerCartaAleatoria();
    this.resultado = '';
  }

  obtenerCartaAleatoria(): Carta {
    const indice = Math.floor(Math.random() * this.mazo.length);
    return this.mazo[indice];
  }

  verificarAdivinanza(esMayor: boolean) {
    this.cartaActual = this.cartaSiguiente;
    this.cartaSiguiente = this.obtenerCartaAleatoria();

    console.log(this.cartaActual)
    console.log(this.cartaSiguiente)
    if ((esMayor && this.cartaActual &&  this.cartaSiguiente.numero > this.cartaActual.numero) ||
        (!esMayor && this.cartaActual &&  this.cartaSiguiente.numero < this.cartaActual.numero)) {
      this.resultado = 'Correcto';
    } else {
      this.resultado = 'Incorrecto';
    }
  }

  obtenerRutaImagen(carta: any): string {
    const rutaBase = 'assets/cartas/';
    const nombreArchivo = `${carta.numero}_${carta.palo}.png`;
    return `${rutaBase}${nombreArchivo}`;
  }
}
