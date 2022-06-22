//https://howtojs.io/how-to-generate-pdf-file-in-angular-13-application-in-multiple-ways/
//npm install jspdf --save
//npm i html2canvas --save


import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTPService } from 'src/app/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface DialogData {
  cedula: number;
  nombre: string;
  apellido: string;

}


@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent implements OnInit {

  displayedColumns = ['id', 'nombre','cantidad',  'precio', 'total', 'acciones'];
  
  reserva: any;

  //join entre detalleConsumo y Producto
  listaConsumo: any;


  ProductoId = null;
  cantidad = 1;
  total=0;


  categorias: any;
  productos: any;
  ReservaId: any;
  CategoriaId: any;
  cabeceraConsumo: any;
  idCliente: any;



  @ViewChild('invoice') invoiceElement!: ElementRef; //para pdf
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HTTPService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.ReservaId =  decodeURI( this.route.snapshot.paramMap.get('id') || '0') ;
    this.getReserva();
    this.getCategorias();
    this.getCabeceraConsumo();
    this.actualizarTotal();


  }

  descargar(){

    html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.invoiceElement.nativeElement.innerHTML)
      PDF.save('ticket.pdf');
    });

  }


  getReserva(){
    this.httpService.getById('reservacion/', this.ReservaId)
      .subscribe(e => {
        //console.log('Reservacion');
        //console.log(e);
        this.reserva = e;
        this.idCliente = this.reserva.ClienteId;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la reserva',
          'Error'
        );
        this.atras();

      });

  }

  getCategorias(){
    this.httpService.getAll('categoriaProducto/')
      .subscribe(e => {
        console.log(e);
        this.categorias = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de categorias',
          'Error'
        );

      });
  }

  getCabeceraConsumo(){
    this.httpService.getById('cabeceraConsumo/getCabeceraConsumoByReservaId/', this.ReservaId)
    .subscribe(e => {
      //console.log('');
      //console.log(e);
      this.cabeceraConsumo = e;
      this.getListaDetalleConsumo();      
    },
    err => {
      console.log(err);
      this.toastr.error(
        'No se pudo obtener la cabecera de consumo',
        'Error'
      );
      this.atras();

    });
  }

  

  getListaDetalleConsumo(){
    console.log('LISTA DE CONSUMO');
    console.log(this.cabeceraConsumo.id);
    this.httpService.getById('detalleConsumo/getByCabeceraConsumoId/', this.cabeceraConsumo.id)
      .subscribe(e => {
        console.log('LISTA DE CONSUMO');
        console.log(e);
        this.listaConsumo = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de productos',
          'Error'
        );

      });
  }

  getProductosByCategoria(){
    this.httpService.getById('producto/getProductosByIdCategoria/', this.CategoriaId)
      .subscribe(e => {
        console.log(e);
        this.productos = e;
      },
      err => {
        console.log(err);
        this.toastr.error(
          'No se pudo obtener la lista de productos por categoria',
          'Error'
        );

      });

  }

  agregarDetalle(){

    if(this.ProductoId === null ){
      this.toastr.error('Debe seleccionar un producto','Error');
    }else{
      this.agregarDetalleDeConsumo();
    }

  }

  agregarDetalleDeConsumo(){
    const e = {
      cantidad: this.cantidad,
      ProductoId: this.ProductoId,
      CabeceraConsumoId: this.cabeceraConsumo.id
    }

    this.httpService.post('detalleConsumo', e)
    .subscribe(result =>{
      this.toastr.success('Producto añadido con éxito');
      this.actualizarTotal();


    }, err => {
      this.toastr.error(
        'No se pudo obtener añadir el producto',
        'Error'
      );

    });

  }

  actualizarTotal(){
    
    this.httpService.post('cabeceraConsumo/ActualizarTotal/'+this.cabeceraConsumo.id, {})
    .subscribe(result =>{
      //this.toastr.success('Cabecera de consumo actualizada con éxito');
      //console.log('ACTUALIZACION DE CABECERAAAAAAA');
      //console.log(result);

      this.getCabeceraConsumo()
    }, err => {
      this.toastr.error(
        'No se pudo actualizar la cabecera',
        'Error'
      );
      console.log('ERROR DE CABECERA')
      console.log(err);

    });
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

  atras() {
	  this.router.navigate(['../../'], {relativeTo: this.route});
  }

  eliminar(id: string){
    this.httpService.delete('detalleConsumo/', id)
    .subscribe( e =>{
      this.toastr.success('Producto eliminado');
      this.actualizarTotal();

    }, err => {
      console.log(err);
      this.toastr.error('Error al eliminar el producto', 'Error');
    });
  }


  //dialog busqueda de cliente
  openDialog(): void{
    const dialogRef = this.dialog.open(BusquedaClienteComponent2, {
      height: '500px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      //si la persona selecciono la opcion de registrar cliente
      if( result === 'registrar'){

        this.openDialogRegistrarCliente();

      }else if( result !== undefined){

        console.log('BUSQUEDA DE CLIENTE Y RESERVA');
        console.log(result);

        this.idCliente = result;
        this.modificarReserva();
        

      }

    });
  }

  //dialog de registro de cliente
  openDialogRegistrarCliente(){
    const dialogRef = this.dialog.open(RegistroClienteComponent2, {
      height: '450px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
      //se registro un nuevo cliente, se necesita de su id
      if( result !== undefined){
        this.idCliente = result;
        console.log('listo para reservar');
        console.log(this.idCliente);

        this.modificarReserva();

      }

    });
  }

  modificarReserva(){
    const e = {
      fecha: this.reserva.fecha,
      horaInicio: this.reserva.horaInicio,
      horaFin: this.reserva.horaFin,
      RestauranteId: this.reserva.RestauranteId,
      MesaId: this.reserva.MesaId,
      ClienteId: this.idCliente
    }

    this.httpService.put('reservacion/',this.reserva.id, e)
    .subscribe(e => {
      this.toastr.success('Cambio de cliente exitoso');
      this.getReserva();
    },
    err => {
      console.log(err);
      this.toastr.error(
        'No se pudo cambiar de cliente',
        'Error'
      );

    });

  }

  cambiarCliente( ){
    
    
    this.openDialog();


  }


  cerrarConsumo(){
    if( this.cabeceraConsumo.estado === 'abierto'){

      const e = {
        horaCierre: new Date().getHours(),
        fechaCierre: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd')
      }


      this.httpService.post('cabeceraConsumo/cerrar/' + this.cabeceraConsumo.id, e)
      .subscribe( e => {
        this.toastr.success('Mesa cerrada');
        this.getCabeceraConsumo();
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se puede cerrar la mesa', 'Error');
      });
    }
  }

  consumoAbierto(){
    if(this.cabeceraConsumo.estado === 'abierto'){
      return true;
    }else{
      return false;
    }
  }


  descargarTicket(){
    if( this.cabeceraConsumo.total > 0){
      this.descargar();
    }else{
      this.toastr.error('No se puede cerrar descargar ticket, el consumo es 0 Gs.', 'Error');

    }
  }



  

}



/* --------------DIALOGS-----------  */

//dialog para busqueda de cliente por nro de cedula
@Component({
  selector: 'app-busqueda-cliente2',
  templateUrl: './busqueda-cliente.component.html',
  styleUrls: ['./busqueda-cliente.component.css']
})
export class BusquedaClienteComponent2 implements OnInit {

  cliente: any;
  cedula = '';
  nombre = '';
  apellido = '';
  id = undefined;

  constructor(
    public dialogRef: MatDialogRef<BusquedaClienteComponent2>,
    private httpService: HTTPService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  buscar(){
    if( this.cedula === ''){
      this.toastr.error('Debe ingresar un número de cédula', 'Error');
    }else{
      this.buscarCliente();
    }
  }

  buscarCliente(){

    this.httpService.getById('cliente/cedula/', this.cedula)
    .subscribe(e => {
      console.log(e);
      this.nombre = e.nombre;
      this.apellido = e.apellido;
      this.id = e.id;

    },
    err => {
      console.log(err);
      this.toastr.error(
        'No se pudo obtener el cliente',
        'Error'
      );

      this.nombre = '';
      this.apellido = '';
      this.cedula = '';
      this.id = undefined;

    });

  }

  //cerrar dialog
  onCancelarClick(): void {
    this.dialogRef.close();
  }

  //
  onAceptarClick(): void {

    if( this.cedula === '' || this.nombre === ''  || this.apellido === ''){
      this.toastr.error('Datos no válidos', 'Error');
      this.cedula = '';
      this.id = undefined;

    }else{
      this.dialogRef.close(this.id);
    }
  }

  onRegistrarClick(){
    this.dialogRef.close('registrar');
  }

}


//dialog para registrar nuevo cliente 
@Component({
  selector: 'app-busqueda-cliente2',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent2 implements OnInit {

  cedula = '';
  nombre = '';
  apellido = '';

  constructor(
    public dialogRef: MatDialogRef<RegistroClienteComponent2>,
    private httpService: HTTPService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onCancelarClick(): void {
    this.dialogRef.close();
  }

  //registrar cliente
  onAceptarClick(): void {

    if( this.cedula === '' || this.nombre === ''  || this.apellido === ''){
      this.toastr.error('Debe completar todos los cambios', 'Error');

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
        //this.toastr.success('Cliente registrado exitosamente');
        this.buscarCliente(); // para obtener el id del cliente registrado
        
      }, err =>{
        console.log(err);
        this.toastr.error('No se pudo crear cliente', 'Error');
      });
	
  }

  // para obtener el id del cliente registrado
  buscarCliente(){
    this.httpService.getById('cliente/cedula/', this.cedula)
    .subscribe(e => {
      console.log(e);
      this.toastr.success('Cliente registrado exitosamente');
      this.dialogRef.close(e.id);
    },
    err => {
      console.log(err);
      this.toastr.error(
        'Error al registrar el cliente',
        'Error'
      );
      

    });
  }


}
