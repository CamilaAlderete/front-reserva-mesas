import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

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
  }

  loadData(){
    this.httpService.getAll('reservacion/')
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

}
