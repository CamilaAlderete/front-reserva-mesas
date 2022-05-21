import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente:any;
  id:any;

  constructor(
    private toastr: ToastrService,
      private route: ActivatedRoute,
      private router: Router,
      private httpService: HTTPService
  ) { }

  ngOnInit(): void {
    //ni idea de porque decode uri no funciona sin un || 'cadena'
    this.id =  decodeURI( this.route.snapshot.paramMap.get('id') || '0') ;
    this.customInit();
  }

  customInit(){
    this.loadCliente();
  }

  loadCliente(){
    this.httpService.getById('cliente/', this.id)
      .subscribe(e => {
        console.log(e);
        this.cliente = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener el cliente',
          'Error'
        );
        this.atras();

      });
  }

  guardar(){
    if( this.cliente.nombre === '' || this.cliente.apellido === '' || this.cliente.cedula=== null){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarCliente();
    }
  }
  

  guardarCliente(){

    const e = {
      nombre: this.cliente.nombre,
      apellido: this.cliente.apellido,
      cedula: this.cliente.cedula
    };

    this.httpService.put('cliente/', this.id, e)
      .subscribe( e => {
        this.toastr.success('Cliente editado exitosamente');
        this.atras();
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se pudo crear cliente', 'Error');
      });
	
  }

  atras() {
    //de clientes/:id/editar a clientes/ 
	  this.router.navigate(['../../'], {relativeTo: this.route});
  }

}
