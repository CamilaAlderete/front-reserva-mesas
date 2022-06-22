import { Component, OnInit, Inject } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from '@angular/common'
import { HTTPService } from 'src/app/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
//import {MatDialog, MatDialogConfig} from '@angular/material/dialog';


export interface DialogData {
  cedula: number;
  nombre: string;
  apellido: string;

}



@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {

  restaurantes: any;
  mesas: any;
  //mesasOcupadas: any;
  mesasOcupadas = [
    {id:1, nombre:'mesa x', RestauranteId:1, capacidad:3, x:5, y:5, planta:1}
  ];

  idCliente: any;

  cliente: any;

  pisos = [ 1, 2, 3];

  idRestaurante: any;
  horaInicio = null;
  horaFin = null;
  piso = null;

  idMesa: any;
  
  //horas disponibles
  listHoraInicio = [ 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  listHoraFin = [ 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  minDate = new Date(); //para que solo se pueda reservar de hoy en adelante
  fecha = null;


  //columnas de la tabla mesas libres
  displayedColumns = ['id', 'nombre-mesa', 'restaurante','capacidad', 'x', 'y', 'planta', 'acciones'];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HTTPService,
    //public dialogRef: MatDialogRef<NuevaReservaComponent>
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.customInit();
    //this.openDialog();
  }

  customInit(){
    this.loadRestaurantes();
  }

  //obtiene toda la lista de restaurantes
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

  //busqueda de mesas libres de acuerdo a fecha, horario y restaurante
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

  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  
  reservar(idMesa: number, idRestaurante: number ){

    console.log('Id mesa e Id Restaurante');
    console.log(idMesa);
    console.log(idRestaurante);
    
    
    this.idMesa = idMesa;
    this.idRestaurante = idRestaurante;
    this.openDialog();

    console.log('Id cliente');
    console.log(this.idCliente);

  }


  generarCabeceraConsumo(reservacion: any){
    const e = {
        ReservacionId: reservacion.id,
        estado: "abierto",
        fechaCreacion: reservacion.fecha,
        horaCreacion: new Date().getHours()
    }

    this.httpService.post('cabeceraConsumo/', e)
    .subscribe(e => {
      //this.toastr.success('');
      //console.log('RESERVACION')
      //console.log(e);
      this.atras(); 
    },
    err => {
      console.log(err);
      this.toastr.error(
        'No se pudo generar la cebecera de consumo',
        'Error'
      );

    });
  }


  reservarMesa(){

    const e = {
      fecha: this.fecha,
      horaInicio: this.horaInicio,
      horaFin: this.horaFin,
      RestauranteId: this.idRestaurante,
      MesaId: this.idMesa,
      ClienteId:this.idCliente
    }

    this.httpService.post('reservacion/', e)
    .subscribe(e => {
      this.toastr.success('Reservación exitosa');
      //console.log('RESERVACION')
      //console.log(e);
      this.generarCabeceraConsumo(e);
    },
    err => {
      console.log(err);
      this.toastr.error(
        'No se pudo realizar la reservación',
        'Error'
      );

    });


  }

  loadPisos(){

  }
    
  //dialog busqueda de cliente
  openDialog(): void{
    const dialogRef = this.dialog.open(BusquedaClienteComponent, {
      height: '500px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      //si la persona selecciono la opcion de registrar cliente
      if( result === 'registrar'){

        this.openDialogRegistrarCliente();

      }else if( result !== undefined){

        console.log('BUSQUEDA DE CLIENTE Y RESERVA');
        console.log(result);

        this.idCliente = result;
        this.reservarMesa();
        

      }

    });
  }

  //dialog de registro de cliente
  openDialogRegistrarCliente(){
    const dialogRef = this.dialog.open(RegistroClienteComponent, {
      height: '450px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
      //se registro un nuevo cliente, se necesita de su id
      if( result !== undefined){
        this.idCliente = result;
        console.log('listo para reservar');
        console.log(this.idCliente);

        this.reservarMesa();

      }

    });
  }

  

}

/* --------------PRUEBA-----------  */

//dialog para busqueda de cliente por nro de cedula
@Component({
  selector: 'app-busqueda-cliente',
  templateUrl: './busqueda-cliente.component.html',
  styleUrls: ['./busqueda-cliente.component.css']
})
export class BusquedaClienteComponent implements OnInit {

  cliente: any;
  cedula = '';
  nombre = '';
  apellido = '';
  id = undefined;

  constructor(
    public dialogRef: MatDialogRef<BusquedaClienteComponent>,
    private httpService: HTTPService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  buscar(){
    if( this.cedula === ''){
      this.toastr.error('Debe ingresar un número de cédula', 'Error');
    }else{
      this.buscarCliente();
    }
  }

  buscarCliente(){

    this.httpService.getById('cliente/cedula/', this.cedula)
    .subscribe(e => {
      console.log(e);
      this.nombre = e.nombre;
      this.apellido = e.apellido;
      this.id = e.id;

    },
    err => {
      console.log(err);
      this.toastr.error(
        'No se pudo obtener el cliente',
        'Error'
      );

      this.nombre = '';
      this.apellido = '';
      this.cedula = '';
      this.id = undefined;

    });

  }

  //cerrar dialog
  onCancelarClick(): void {
    this.dialogRef.close();
  }

  //
  onAceptarClick(): void {

    if( this.cedula === '' || this.nombre === ''  || this.apellido === ''){
      this.toastr.error('Datos no válidos', 'Error');
      this.cedula = '';
      this.id = undefined;

    }else{
      this.dialogRef.close(this.id);
    }
  }

  onRegistrarClick(){
    this.dialogRef.close('registrar');
  }

}


//dialog para registrar nuevo cliente 
@Component({
  selector: 'app-busqueda-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  cedula = '';
  nombre = '';
  apellido = '';

  constructor(
    public dialogRef: MatDialogRef<RegistroClienteComponent>,
    private httpService: HTTPService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onCancelarClick(): void {
    this.dialogRef.close();
  }

  //registrar cliente
  onAceptarClick(): void {

    if( this.cedula === '' || this.nombre === ''  || this.apellido === ''){
      this.toastr.error('Debe completar todos los cambios', 'Error');

    }else{
      this.guardarCliente();      
    }
  }


  guardarCliente(){

    const e = {
      nombre: this.nombre,
      apellido: this.apellido,
      cedula: this.cedula
    };

    this.httpService.post('cliente', e)
      .subscribe( e => {
        //this.toastr.success('Cliente registrado exitosamente');
        this.buscarCliente(); // para obtener el id del cliente registrado
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se pudo crear cliente', 'Error');
      });
	
  }

  // para obtener el id del cliente registrado
  buscarCliente(){
    this.httpService.getById('cliente/cedula/', this.cedula)
    .subscribe(e => {
      console.log(e);
      this.toastr.success('Cliente registrado exitosamente');
      this.dialogRef.close(e.id);
    },
    err => {
      console.log(err);
      this.toastr.error(
        'Error al registrar el cliente',
        'Error'
      );
      

    });
  }


}

