import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

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
    private router: Router
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

  }

  cancelar(){
	this.router.navigate(['../'], {relativeTo: this.route});
  }

}
