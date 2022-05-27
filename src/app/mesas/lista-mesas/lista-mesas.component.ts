import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-lista-mesas',
  templateUrl: './lista-mesas.component.html',
  styleUrls: ['./lista-mesas.component.css']
})
export class ListaMesasComponent implements OnInit {

  displayedColumns = ['id', 'nombre-mesa', 'restaurante','capacidad', 'x', 'y', 'planta', 'acciones'];

  dataSource:any

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
    this.httpService.getAll('mesa/')
      .subscribe(e => {
        console.log(e);
        this.dataSource = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de mesas',
          'Error'
        );

      });
  }

  
  eliminar(id: string){
    this.httpService.delete('mesa/', id)
    .subscribe( e =>{
      this.toastr.success('Mesa eliminada');
      this.loadData();
    }, err => {
      console.log(err);
      this.toastr.error('Error al eliminar mesa', 'Error');
    });
  }

  editar(id: string){
    return encodeURI(id) + '/editar/'
  }


}
