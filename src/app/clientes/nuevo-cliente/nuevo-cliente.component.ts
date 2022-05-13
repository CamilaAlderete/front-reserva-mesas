import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  cedula = null;		
  nombre = '';
  apellido = '';


  constructor(
	private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  guardar(){
	if( this.nombre === '' || this.apellido === '' || this.cedula=== null){
		this.toastr.error('Debe completar todos los campos', 'Error');
	}else{
		this.guardarCliente();
	}
  }
  

  guardarCliente(){
	
	
  }

  cancelar() {
	this.router.navigate(['../'], {relativeTo: this.route});
  }


}
