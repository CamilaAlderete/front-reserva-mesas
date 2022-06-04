import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit {

  displayedColumns = ['id', 'restaurante', 'fecha','horario', 'mesa', 'cliente', 'acciones'];

  /*Reservacion cuneta con id, fecha, horaInicio, horaFin, MesaId, RestauranteId, ClienteId */

  //restaurante, fecha, cliente, horario (creciente), mesa(creciente)
  dataSource:any

  restaurantes: any;
  clientes: any;

  RestauranteId = null;
  fecha = null;
  ClienteId = null;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, 
    private httpService: HTTPService
  ) { }

  ngOnInit(): void {
    this.customInit();
  }


  customInit(){
    this.loadData();
    this.loadRestaurantes();
    this.loadClientes();
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

  loadClientes(){

    this.httpService.getAll('cliente/')
    .subscribe(e => {
      console.log(e);
      this.clientes = e;
    },
    err => {
      console.log(err);
      this.toastr.error(
        'No se pudo obtener la lista de clientes',
        'Error'
      );

    });

  }

  loadData(){
    this.httpService.post('reservacion/lista', {})
      .subscribe(e => {
        console.log(e);
        this.dataSource = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de reservas',
          'Error'
        );

      });
  }

  filtrar(){

    if( this.RestauranteId === null || this.fecha === null){
      this.toastr.error('Los campos Restaurante y Fecha son obligatorios');
    }else{

      const e = {
        fecha: new DatePipe('en-US').transform(this.fecha, 'yyyy-MM-dd'),
        RestauranteId: this.RestauranteId,
        ClienteId: this.ClienteId
      }

      this.httpService.getFilter('reservacion/filter', e)
      .subscribe(e => {
        console.log(e);
        this.dataSource = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de reservas',
          'Error'
        );

      });



    }
  }

  
  eliminar(id: string){
    this.httpService.delete('reservacion/', id)
    .subscribe( e =>{
      this.toastr.success('Reserva eliminada');
      this.loadData();
    }, err => {
      console.log(err);
      this.toastr.error('Error al eliminar la reserva', 'Error');
    });
  }

  editar(id: string){
    return encodeURI(id) + '/editar/'
  }

  limpiarFiltro(){
    this.RestauranteId = null;
    this.fecha = null;
    this.ClienteId = null;
    this.loadData();
  }

}
