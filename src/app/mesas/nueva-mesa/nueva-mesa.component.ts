import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-nueva-mesa',
  templateUrl: './nueva-mesa.component.html',
  styleUrls: ['./nueva-mesa.component.css']
})
export class NuevaMesaComponent implements OnInit {
		
  nombre = '';
  idRestaurante = null;
  piso = 1;
  x= null;
  y = null;
  capacidad = null;



  constructor(
	private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  guardar(){
    if( this.nombre === '' || this.idRestaurante === null || this.piso === null || this.x === null || this.y === null || this.capacidad === null){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarMesa();
    }
  }
    
  
  guardarMesa(){
    
    
  }
  
  cancelar() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }



}
