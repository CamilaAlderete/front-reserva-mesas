import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit {

  displayedColumns = ['id', 'restaurante', 'fecha','horario', 'planta',  'mesa', 'cliente', 'acciones'];

  /*Reservacion cuneta con id, fecha, horaInicio, horaFin, MesaId, RestauranteId, ClienteId */

  //restaurante, fecha, cliente, horario (creciente), mesa(creciente)
  dataSource = [
    { id:1 , RestauranteId: 1, nombreRestaurante: 'Shagrila', fecha:'2022/05/12', planta:1, MesaId:1, nombreMesa:'LA MESA', ClienteId:1, nombreCliente: 'Camila', horaInicio:12, horaFin:14 },
    { id:1 , RestauranteId: 1, nombreRestaurante: 'Shagrila', fecha:'2022/05/12', planta:1, MesaId:1, nombreMesa:'LA MESA', ClienteId:1, nombreCliente: 'Camila', horaInicio:12, horaFin:14 },


  ];

  constructor() { }

  ngOnInit(): void {
  }

}
