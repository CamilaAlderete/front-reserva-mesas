import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-nueva-mesa',
  templateUrl: './nueva-mesa.component.html',
  styleUrls: ['./nueva-mesa.component.css']
})
export class NuevaMesaComponent implements OnInit {
		
  nombre = '';
  RestauranteId = null;
  piso = 1;
  x= null;
  y = null;
  capacidad = null;

  restaurantes:any



  constructor(
	  private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HTTPService

  ) { }

  ngOnInit(): void {
    this.loadRestaurantes();
  }

  guardar(){
    if( this.nombre === '' || this.RestauranteId === null || this.piso === null || this.x === null || this.y === null || this.capacidad === null){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarMesa();
    }
  }
    
  
  guardarMesa(){

    const e = {
      nombre: this.nombre,
      RestauranteId: this.RestauranteId,
      planta: this.piso,
      x:this.x,
      y: this.y,
      capacidad: this.capacidad
    };

    this.httpService.post('mesa', e)
      .subscribe( e => {
        this.toastr.success('Mesa creada exitosamente');
        this.atras();
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se pudo crear la mesa', 'Error');
      });

  }

  atras() {
	  this.router.navigate(['../'], {relativeTo: this.route});
  }

  loadRestaurantes(){
    this.httpService.getAll('restaurante/')
      .subscribe(e => {
        console.log(e);
        this.restaurantes = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de restaurantes',
          'Error'
        );

      });
  }
  
  



}
