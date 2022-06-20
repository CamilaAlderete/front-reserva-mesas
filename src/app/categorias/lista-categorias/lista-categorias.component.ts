import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {

  dataSource: any;

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];  //columnas del la tabla


  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, 
    private httpService: HTTPService
  ) { }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(){
    this.httpService.getAll('categoriaProducto/')
      .subscribe(e => {
        console.log(e);
        this.dataSource = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de categorias',
          'Error'
        );

      });
  }

  eliminar(id: string){
    this.httpService.delete('categoriaProducto/', id)
    .subscribe( e =>{
      this.toastr.success('Categoria eliminada');
      this.loadCategorias();
    }, err => {
      console.log(err);
      this.toastr.error('Error al eliminar categoria', 'Error');
    });
  }

  editar(id: string){
    return encodeURI(id) + '/editar/'
  }

}
