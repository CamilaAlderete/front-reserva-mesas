import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  nombre = '';
  precio= null;
  CategoriaProductoId = null;

  categorias: any;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HTTPService
  ) { }

  ngOnInit(): void {
    this.loadCategorias();
  }

  guardar(){
    if( this.nombre === '' || this.CategoriaProductoId === null || this.precio === null){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else if ( this.precio === 0){
      this.toastr.error('El precio debe ser mayor a 0', 'Error');
    }else{
      this.guardarProducto();
    }
  }

  guardarProducto(){

    const e = {
      nombre: this.nombre,
      precio: this.precio,
      CategoriaProductoId: this.CategoriaProductoId
    };

    this.httpService.post('producto', e)
      .subscribe( e => {
        this.toastr.success('Producto creado exitosamente');
        this.atras();
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se pudo crear el producto', 'Error');
      });

  }

  atras() {
	  this.router.navigate(['../'], {relativeTo: this.route});
  }

  loadCategorias(){
    this.httpService.getAll('categoriaProducto/')
      .subscribe(e => {
        console.log(e);
        this.categorias = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de categorias',
          'Error'
        );

      });
  }


}
