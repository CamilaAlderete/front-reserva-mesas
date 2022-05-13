import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-restaurantes',
  templateUrl: './lista-restaurantes.component.html',
  styleUrls: ['./lista-restaurantes.component.css']
})
export class ListaRestaurantesComponent implements OnInit {

  dataSource = [
    { id:2, nombre: 'ShangriLa', direccion: 'Mcal Estigarribia'},
    { id:3, nombre: 'Lomilandia', direccion: 'Rca. Argentina'}
  ];
  
  displayedColumns: string[] = ['id','nombre','direccion', 'acciones'];  //columnas del la tabla

  constructor() { }

  ngOnInit(): void {
  }

}
