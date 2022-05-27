import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-nuevo-restaurante',
  templateUrl: './nuevo-restaurante.component.html',
  styleUrls: ['./nuevo-restaurante.component.css']
})
export class NuevoRestauranteComponent implements OnInit {

  nombre = '';
  direccion = '';

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HTTPService

  ) { }

  ngOnInit(): void {
  }

  guardar(){
    if( this.nombre === '' || this.direccion === '' ){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarRestaurante();
    }
  }
  
  guardarRestaurante(){

    const e = {
      nombre: this.nombre,
      direccion: this.direccion
    };

    this.httpService.post('restaurante', e)
      .subscribe( e => {
        this.toastr.success('Restaurante creado exitosamente');
        this.atras();
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se pudo crear el restaurante', 'Error');
      });

  }

  atras() {
	  this.router.navigate(['../'], {relativeTo: this.route});
  }

}
