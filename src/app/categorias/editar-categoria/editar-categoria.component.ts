import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  id: any;
  categoria: any;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HTTPService
  ) { }

  ngOnInit(): void {
    this.id =  decodeURI( this.route.snapshot.paramMap.get('id') || '0') ;
    this.loadData();
  }

  loadData(){
    this.httpService.getById('categoriaProducto/', this.id)
      .subscribe(e => {
        console.log(e);
        this.categoria = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la categoria',
          'Error'
        );
        this.atras();

      });
  }

  atras() {
	  this.router.navigate(['../../'], {relativeTo: this.route});
  }

  guardar(){
    if( this.categoria.nombre === '' ){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarCategoria();
    }
  }

  guardarCategoria(){

    const e = {
      nombre: this.categoria.nombre
    };

    this.httpService.put('categoriaProducto/', this.id, e)
      .subscribe( e => {
        this.toastr.success('Categoria editada exitosamente');
        this.atras();
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se pudo editar la categoria', 'Error');
      });
	
  }

}
