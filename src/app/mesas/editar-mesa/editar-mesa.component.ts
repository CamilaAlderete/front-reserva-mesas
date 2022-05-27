import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-editar-mesa',
  templateUrl: './editar-mesa.component.html',
  styleUrls: ['./editar-mesa.component.css']
})
export class EditarMesaComponent implements OnInit {

  id: any;
  mesa:any;
  restaurantes: any;

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
    this.loadRestaurantes();
  }

  loadData(){
    this.httpService.getById('mesa/', this.id)
      .subscribe(e => {
        console.log(e);
        this.mesa = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la mesa',
          'Error'
        );
        this.atras();

      });
  }

  atras() {
	  this.router.navigate(['../../'], {relativeTo: this.route});
  }

  guardar(){
    if( this.mesa.nombre === '' || this.mesa.idRestaurante === null || this.mesa.piso === null || this.mesa.x === null || this.mesa.y === null ||this.mesa.capacidad ===null ){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarMesa();
    }
  }

  guardarMesa(){

    const e = {
      nombre: this.mesa.nombre,
      RestauranteId: this.mesa.RestauranteId,
      planta: this.mesa.planta,
      x:this.mesa.x,
      y: this.mesa.y,
      capacidad: this.mesa.capacidad
    };

    this.httpService.put('mesa/', this.id, e)
      .subscribe( e => {
        this.toastr.success('Mesa editada exitosamente');
        this.atras();
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se pudo editar la mesa', 'Error');
      });
	
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
