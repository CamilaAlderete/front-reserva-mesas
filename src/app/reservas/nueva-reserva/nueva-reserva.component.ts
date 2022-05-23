import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from '@angular/common'
import { HTTPService } from 'src/app/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {

  restaurantes: any;
  mesas: any;

  //usuario
  nombre='';
  apellido= '';
  cedula=null;

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


  //columnas de la tabla mesas libres
  displayedColumns = ['id', 'nombre-mesa', 'restaurante', 'x', 'y', 'planta', 'acciones'];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HTTPService,
    //public dialogRef: MatDialogRef<NuevaReservaComponent>

  ) { }

  ngOnInit(): void {
    this.customInit();
  }

  customInit(){
    this.loadRestaurantes();
  }

  loadRestaurantes(){
    this.httpService.getAll('restaurante/')
      .subscribe(e => {
        console.log(e);
        this.restaurantes = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de restaurantes',
          'Error'
        );

      });
  }


  buscar(){

  
    if( this.fecha === null || this.horaInicio === null || this.horaFin === null || this.idRestaurante === null){

      this.toastr.error('Debe completar todos los campos', 'Error');

    }else{

      if(this.horaInicio >= this.horaFin){

        this.toastr.error('La hora de inicio debe ser menor a la hora de fin', 'Error');

      }else{

        const data = {
          fecha: new DatePipe('en-US').transform(this.fecha, 'yyyy-MM-dd') ,
          horaInicio : this.horaInicio,
          horaFin: this.horaFin,
          RestauranteId: this.idRestaurante
        };

        //console.log(data);

        this.buscarMesasLibres(data);
      }
    }

  }

  buscarMesasLibres( data: any){

    console.log(data);

    this.httpService.getFilter('reservacion/libres', data)
    .subscribe(e => {
      console.log(e);
      this.mesas = e;
    },
    err => {
      console.log(err);
      this.toastr.error(
        'No se pudo obtener la lista de mesas libres',
        'Error'
      );

    });
  }

  reservar( ){
   
  }
    
  /*openDialog(): void{
    const dialogRef = this.dialog.open(NuevaReservaComponent, {
      width: '250px',
      cliente: {cedula: this.cedula, nombre: this.nombre, apellido: this.apellido},
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }*/
  
  cancelar() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  loadPisos(){

  }

  

}
