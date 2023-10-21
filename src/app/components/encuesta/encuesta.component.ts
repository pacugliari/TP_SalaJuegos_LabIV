import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EncuestaService } from 'src/app/services/encuesta.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {


  indice : number = 0;

  encuestaForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required
    ]),
    apellido: new FormControl('', [
      Validators.required
    ]),
    edad: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(99)
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(10)
    ]),
    comoNosEncontraste: new FormControl('', [
      Validators.required
    ]),
    cuantoGusto: new FormControl('',[
      Validators.required,Validators.min(1),Validators.max(10)
    ]),
    cualesJugaste: new FormControl('', [
      Validators.required
    ]),
    recomendarias: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private dialog: MatDialog, private router: Router,private encuestaService:EncuestaService) { }//private encuestaSVC: EncuestaService

  ngOnInit(): void {
    this.encuestaForm.patchValue({
      cuantoGusto: String(5)
    });
  }

  enviarEncuesta() {

    this.encuestaService.enviar(this.encuestaForm.value);
    this.router.navigate(["/home"])
    Swal.fire("",'Encuesta cargada correctamente','success')

  }

  siguiente(){
    this.indice++;
  }
  atras(){
    this.indice--;
  }
}
