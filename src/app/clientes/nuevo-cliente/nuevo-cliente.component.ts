import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

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
    private router: Router,
    private httpService: HTTPService
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

    const e = {
      nombre: this.nombre,
      apellido: this.apellido,
      cedula: this.cedula
    };

    this.httpService.post('cliente', e)
      .subscribe( e => {
        this.toastr.success('Cliente creado exitosamente');
        this.atras();
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se pudo crear cliente', 'Error');
      });
	
  }

  atras() {
	  this.router.navigate(['../'], {relativeTo: this.route});
  }


}
