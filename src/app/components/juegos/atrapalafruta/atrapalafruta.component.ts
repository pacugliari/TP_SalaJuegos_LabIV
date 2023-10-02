import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atrapalafruta',
  templateUrl: './atrapalafruta.component.html',
  styleUrls: ['./atrapalafruta.component.css']
})
export class AtrapalafrutaComponent {
  @ViewChild('gameCanvas', { static: true }) gameCanvas?: ElementRef;
  ctx?: CanvasRenderingContext2D;
  player?: { x: number; y: number };
  private fruits: { x: number; y: number; image: HTMLImageElement }[] = [];
  isGameRunning?: boolean;
  score?: number = 0;
  frutasPerdidas: number = 0;
  limiteFrutas: number = 5;
  
  private playerImage?: HTMLImageElement;
  private fruitImages: HTMLImageElement[] = [];

  constructor(private router:Router) {
    this.playerImage = new Image();
    this.playerImage.src = '../../../../assets/atrapafruta/manos-abiertas.png'; // Ruta a la imagen del jugador

    // Rutas a las imágenes de frutas disponibles en assets
    const fruitPaths = [
      '../../../../assets/atrapafruta/fresa.png',
      '../../../../assets/atrapafruta/manzana.png',
      '../../../../assets/atrapafruta/naranja.png',
      '../../../../assets/atrapafruta/platanos.png',
      '../../../../assets/atrapafruta/sandia.png',
      '../../../../assets/atrapafruta/uvas.png'
      // Agrega más rutas de imágenes de frutas
    ];

    // Cargar imágenes de frutas en un array
    for (const path of fruitPaths) {
      const image = new Image();
      image.src = path;
      this.fruitImages.push(image);
    }
  }

  ngAfterViewInit() {
    this.ctx = this.gameCanvas?.nativeElement.getContext('2d');
    window.addEventListener('keydown', (event) => this.movePlayer(event));
    this.initializeGame();
  }

  initializeGame() {
    this.player = { x: 200, y: 350 };
    this.fruits = [];
    this.isGameRunning = false;
    this.drawGame();
  }

  startGame() {
    if(this.frutasPerdidas === this.limiteFrutas){
      this.frutasPerdidas = 0;
      this.initializeGame();
    }

    if (!this.isGameRunning) {
      this.isGameRunning = true;
      this.gameLoop();
    }
  
  }

  gameLoop() {
    if (this.isGameRunning) {
      this.moveFruits();
      this.checkCollision();
      this.drawGame();
      requestAnimationFrame(() => this.gameLoop());
    }
  }
  moveFruits() {

    if (this.fruits) {
      for (let i = 0; i < this.fruits.length; i++) {
        this.fruits[i].y += 1; // Velocidad de caída de las frutas
        if (this.fruits[i].y > 380) {
          // Eliminar frutas que llegan al suelo
          this.fruits.splice(i, 1);
          i--;
          this.frutasPerdidas++;
        }
      }

      // Generar nuevas frutas con imágenes aleatorias
      if (Math.random() < 0.009) {
        const x = Math.random() * 400;
        const randomFruitIndex = Math.floor(Math.random() * this.fruitImages.length);
        const image = this.fruitImages[randomFruitIndex];
        this.fruits.push({ x, y: 0, image });
      }
    }
    
    if (this.frutasPerdidas >= this.limiteFrutas && this.isGameRunning) {
      // Si se excede el límite de 15 frutas, el jugador pierde
      this.endGame();
    }
  }

  endGame() {
    this.isGameRunning = false;
    //alert('¡Perdiste! Excediste el límite de '+this.limiteFrutas+' frutas recolectadas.');
    Swal.fire({
      icon: 'error',
      title: 'Lo siento 😭 Perdiste!',
      html: 'Exediste el limite de frutas no atrapadas: <b>'+this.limiteFrutas+"</b>"
    })
  }

  checkCollision() {
    if(typeof this.score === 'undefined')
      this.score = 0

    if (this.fruits && this.player) {
      const playerLeft = this.player.x;
      const playerRight = this.player.x + 40;
      const playerTop = this.player.y;
      const playerBottom = this.player.y + 40;

      for (let i = 0; i < this.fruits.length; i++) {
        const fruit = this.fruits[i];
        const fruitLeft = fruit.x;
        const fruitRight = fruit.x + 20;
        const fruitTop = fruit.y;
        const fruitBottom = fruit.y + 20;

        if (
          playerLeft < fruitRight &&
          playerRight > fruitLeft &&
          playerTop < fruitBottom &&
          playerBottom > fruitTop
        ) {
          // El jugador atrapó la fruta
          this.fruits.splice(i, 1);
          this.score++;
        }
      }
    }
  }

  drawGame() {
    if (this.ctx && this.fruits && this.player && this.playerImage) {
      this.ctx.clearRect(0, 0, 400, 400); // Limpiar el lienzo

      // Dibujar al jugador
      this.ctx.drawImage(this.playerImage, this.player.x, this.player.y, 40, 40);

      // Dibujar las frutas
      for (const fruit of this.fruits) {
        this.ctx.drawImage(fruit.image, fruit.x, fruit.y, 40, 40);
      }

      // Mostrar puntuación
      this.ctx.fillStyle = 'black';
      this.ctx.font = '20px Arial';
      //this.ctx.fillText('Puntuación: ' + this.score, 10, 30);
    }
  }

  movePlayer(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' && this.player && this.player.x > 0) {
      this.player.x -= 20; // Mover hacia la izquierda
    } else if (event.key === 'ArrowRight' && this.player && this.player.x < 360) {
      this.player.x += 20; // Mover hacia la derecha
    }
  }
}
