import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css']
})
export class NuevaCategoriaComponent implements OnInit {

  nombre = '';

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HTTPService
  ) { }

  ngOnInit(): void {
  }

  guardar(){
    if( this.nombre === ''){
      this.toastr.error('El campo no puede estar vacío', 'Error');
    }else{
      this.guardarCategoria();
    }
  }

  
  guardarCategoria(){

    const e = {
      nombre: this.nombre
    };

    this.httpService.post('categoriaProducto', e)
      .subscribe( e => {
        this.toastr.success('Categoria creada exitosamente');
        this.atras();
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se pudo crear categoria', 'Error');
      });
	
  }

  atras() {
	  this.router.navigate(['../'], {relativeTo: this.route});
  }

}
