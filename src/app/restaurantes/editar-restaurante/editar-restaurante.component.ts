import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-editar-restaurante',
  templateUrl: './editar-restaurante.component.html',
  styleUrls: ['./editar-restaurante.component.css']
})
export class EditarRestauranteComponent implements OnInit {

  id: any;
  restaurante: any;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HTTPService
  ) { }

  ngOnInit(): void {
    this.id =  decodeURI( this.route.snapshot.paramMap.get('id') || '0') ;
    this.customInit();
  }

  customInit(){
    this.loadData();
  }

  loadData(){
    this.httpService.getById('restaurante/', this.id)
      .subscribe(e => {
        console.log(e);
        this.restaurante = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener el restaurante',
          'Error'
        );
        this.atras();

      });
  }

  atras() {
    //de restaurantes/:id/editar ----->  restaurantes/ 
	  this.router.navigate(['../../'], {relativeTo: this.route});
  }

  guardar(){
    if( this.restaurante.nombre === '' || this.restaurante.direccion === '' ){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarRestaurante();
    }
  }

  guardarRestaurante(){

    const e = {
      nombre: this.restaurante.nombre,
      direccion: this.restaurante.direccion
    };

    this.httpService.put('restaurante/', this.id, e)
      .subscribe( e => {
        this.toastr.success('Restaurante editado exitosamente');
        this.atras();
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se pudo editar el restaurante', 'Error');
      });
	
  }

}
