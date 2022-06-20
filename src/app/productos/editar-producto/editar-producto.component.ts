import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  id: any;
  producto: any;
  categorias: any;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HTTPService
  ) { }

  ngOnInit(): void {
    this.id =  decodeURI( this.route.snapshot.paramMap.get('id') || '0') ;
    this.loadCategorias();
    this.loadData();
  }

  loadData(){
    this.httpService.getById('producto/', this.id)
      .subscribe(e => {
        console.log(e);
        this.producto = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener el producto',
          'Error'
        );
        this.atras();

      });
  }

  atras() {
	  this.router.navigate(['../../'], {relativeTo: this.route});
  }

  guardar(){
    if( this.producto.nombre === '' || this.producto.precio === null || this.producto.CategoriaProductoId === null ){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else if( this.producto.precio === 0){
      this.toastr.error('El precio debe de ser mayor a cero', 'Error');
    }else{
      this.guardarProducto();
    }
  }

  guardarProducto(){

    const e = {
      nombre: this.producto.nombre,
      precio: this.producto.precio,
      CategoriaProductoId: this.producto.CategoriaProductoId
    };

    this.httpService.put('producto/', this.id, e)
      .subscribe( e => {
        this.toastr.success('Producto editado exitosamente');
        this.atras();
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se pudo editar el producto', 'Error');
      });
	
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
