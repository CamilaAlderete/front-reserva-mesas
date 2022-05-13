import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  dataSource = [
    { id:2, cedula: 11212121, nombre: 'camila', apellido: 'alderete'},
    { id:3, cedula: 22323423, nombre: 'monica', apellido: 'auler'},
    { id:1, cedula: 43323232, nombre: 'soledad',apellido: 'ayala'}
  ];

  displayedColumns: string[] = ['id','cedula', 'nombre','apellido', 'acciones'];  //columnas del la tabla


  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  holaaa(){
    this.toastr.success('hola capa','aaa');
  }

  nuevo(){
    
  }

  

}
