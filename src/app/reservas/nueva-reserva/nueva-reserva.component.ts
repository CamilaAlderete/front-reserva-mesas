import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {

  restaurantes = [
    { id: 1, nombre:'ShangriLa', direccion:'Mcal Estigarribia'},
    { id: 2, nombre:'Lomilandia', direccion:'Rca Argentina'}
  ];

  pisos = [ 1, 2, 3];

  idRestaurante = null;
  horaInicio = null;
  horaFin = null;
  piso = null;
  //horas disponibles
  listHoraInicio = [ 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  listHoraFin = [ 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  minDate = new Date(); //para que solo se pueda reservar de hoy en adelante
  fecha = null;

  prueba = new Date();

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  func_prueba(){
    console.log(this.prueba.toLocaleDateString('zh-Hans-CN'));
  }

  loadPisos(){

  }

  verificarHorario(){
    if( this.horaInicio === null || this.horaFin === null){
      this.toastr.warning('Debe ingresar horario de inicio y fin', 'Warning');

    }else{
      
      if( this.horaInicio >= this.horaFin){
        this.toastr.warning('La hora de inicio no puede ser mayor o igual a la hora de fin', 'Warning');
      }
    }
  }

  guardar( ){
    
    if( this.idRestaurante === null ){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarMesa();
    }
  }
    
  
  guardarMesa(){
    
    
  }
  
  cancelar() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
