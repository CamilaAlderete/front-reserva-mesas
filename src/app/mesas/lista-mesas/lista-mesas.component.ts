import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-mesas',
  templateUrl: './lista-mesas.component.html',
  styleUrls: ['./lista-mesas.component.css']
})
export class ListaMesasComponent implements OnInit {

  displayedColumns = ['id', 'nombre-mesa', 'restaurante', 'x', 'y', 'planta', 'acciones'];

  dataSource = [
    { id:1 , nombre: 'MESA 1' , idRestaurante: 1, x: 1, y: 1 , planta: 1},
    { id:2 , nombre: 'MESA 2' , idRestaurante: 2, x: 1, y: 2 , planta:1}

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
