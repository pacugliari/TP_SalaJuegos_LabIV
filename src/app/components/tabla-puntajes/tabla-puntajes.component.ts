import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabla-puntajes',
  templateUrl: './tabla-puntajes.component.html',
  styleUrls: ['./tabla-puntajes.component.css']
})
export class TablaPuntajesComponent {

  @Input() juego: string = ""
  columnas: string[] = ['usuario', 'puntaje','fecha'];
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  lista : MatTableDataSource<any> = new MatTableDataSource<any>();


  actualizar(data:any){
    this.lista.data = data;
  }

  ngOnInit(){
    this.lista.paginator = this.paginator
  }
}
