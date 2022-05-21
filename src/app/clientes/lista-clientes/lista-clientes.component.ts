import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  dataSource: any;

  displayedColumns: string[] = ['id','cedula', 'nombre','apellido', 'acciones'];  //columnas del la tabla


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
    this.loadClientes();
  }

  loadClientes(){
    this.httpService.getAll('cliente/')
      .subscribe(e => {
        console.log(e);
        this.dataSource = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de clientes',
          'Error'
        );

      });
  }

  
  eliminar(id: string){
    this.httpService.delete('cliente/', id)
    .subscribe( e =>{
      this.toastr.success('Cliente eliminado');
      this.loadClientes();
    }, err => {
      console.log(err);
      this.toastr.error('Error al eliminar cliente', 'Error');
    });
  }

  editar(id: string){
    return encodeURI(id) + '/editar/'
  }

  holaaa(){
    this.toastr.success('hola capa','aaa');
  }

 

}
