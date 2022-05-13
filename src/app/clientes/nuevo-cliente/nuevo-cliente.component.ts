import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  nombre = '';
  direccion = '';


  constructor(
	private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  guardar(){
	if( this.nombre === '' || this.direccion === '' ){
		this.toastr.error('Debe completar todos los campos', 'Error');
	}else{
		this.guardarCliente();
	}
  }
  

  guardarCliente(){

  }




  cancelar() {
	//this.router.navigate(['../'], {relativeTo: this.route});
  }


}
