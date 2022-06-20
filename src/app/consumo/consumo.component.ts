import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent implements OnInit {

  displayedColumns = ['id', 'nombre','cantidad',  'precio', 'total', 'acciones'];
  

  reserva =
    { id:1, horaInicio:12, horaFin:13, fecha:'2022-06-07',
      MesaId:1, nombreMesa: 'mesa x', capacidad:5, x:2, y:3,
      RestauranteId: 1, nombreRestaurante:'Lomilandia',
      ClienteId:1, nombreCliente: 'Camila Alderete'
    };


  // modificar fecha de creacion y cierre por tipo de dato fecha y hora
  //cabecera
  consumo = {
    id:1, estado:'Abierto', total:15000, fechaCreacion:'2022-06-17', fechaCierre:'2022-06-17'
  };  

  //join entre detalleConsumo y Producto
  listaConsumo = [
    { id: 1, cantidad: 2, ProductoId:1, nombre:'Gaseosa', precio:5000, total:10000 },
    { id: 2, cantidad: 5, ProductoId:1, nombre:'Hamburguesa', precio:10000, total:50000 },
    { id: 2, cantidad: 2, ProductoId:1, nombre:'Papas fritas', precio:5000, total:10000 }
  ];


  ProductoId = null;
  CategoriaId = null;
  cantidad = 1;
  total=0;

  totalConsumo = 70000;

  categorias = [
    {id:1, nombre:'Bebidas'},
    {id:2, nombre:'Comida'},
    
  ];

  productos = [
    { id:1, nombre:'Gaseosa', precio:5000, CategoriaId:1  },
    { id:2, nombre:'Hamburguesa', precio:10000, CategoriaId:2  },
    { id:3, nombre:'Papas fritas', precio:5000, CategoriaId:3  }
  ];


  constructor() { }

  ngOnInit(): void {
  }

  getListaDetalleConsumo(){

  }

  getProductosByCategoria(){

  }

  totalProducto(){

    for(var producto of this.productos){

      if(producto.id === this.ProductoId){
        this.total = producto.precio * this.cantidad;
        break;
      }
    }
  }


  onclick(){
    alert('funciona');
  }

}
