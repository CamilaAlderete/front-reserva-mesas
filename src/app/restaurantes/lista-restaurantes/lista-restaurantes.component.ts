import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-lista-restaurantes',
  templateUrl: './lista-restaurantes.component.html',
  styleUrls: ['./lista-restaurantes.component.css']
})
export class ListaRestaurantesComponent implements OnInit {

  dataSource: any;
  
  displayedColumns: string[] = ['id','nombre','direccion', 'acciones'];  //columnas del la tabla

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, 
    private httpService: HTTPService
  ) { }

  ngOnInit(): void {
    this.customInit();
  }


  customInit(){
    this.loadData();
  }

  loadData(){
    this.httpService.getAll('restaurante/')
      .subscribe(e => {
        console.log(e);
        this.dataSource = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de restaurantes',
          'Error'
        );

      });
  }

  eliminar(id: string){
    this.httpService.delete('restaurante/', id)
    .subscribe( e =>{
      this.toastr.success('Restaurante eliminado');
      this.loadData();
    }, err => {
      console.log(err);
      this.toastr.error('Error al eliminar restaurante', 'Error');
    });
  }

  editar(id: string){
    return encodeURI(id) + '/editar/'
  }




}
