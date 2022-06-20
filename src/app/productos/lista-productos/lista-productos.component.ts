import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  dataSource: any;

  displayedColumns: string[] = ['id','nombre', 'precio', 'acciones'];  //columnas del la tabla


  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, 
    private httpService: HTTPService
  ) { }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(){
    this.httpService.getAll('producto/')
      .subscribe(e => {
        console.log(e);
        this.dataSource = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de productos',
          'Error'
        );

      });
  }

  editar(id: string){
    return encodeURI(id) + '/editar/'
  }

  eliminar(id: string){
    this.httpService.delete('producto/', id)
    .subscribe( e =>{
      this.toastr.success('Producto eliminado');
      this.loadProductos();
    }, err => {
      console.log(err);
      this.toastr.error('Error al eliminar producto', 'Error');
    });
  }

}
