import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FormComponent } from './form/form.component';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatDividerModule} from '@angular/material/divider';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'
import { InicioComponent } from './inicio/inicio.component';
import { ListaClientesComponent } from './clientes/lista-clientes/lista-clientes.component';
import { NuevoClienteComponent } from './clientes/nuevo-cliente/nuevo-cliente.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';
import { ListaRestaurantesComponent } from './restaurantes/lista-restaurantes/lista-restaurantes.component';
import { NuevoRestauranteComponent } from './restaurantes/nuevo-restaurante/nuevo-restaurante.component';
import { EditarRestauranteComponent } from './restaurantes/editar-restaurante/editar-restaurante.component';
import { ListaMesasComponent } from './mesas/lista-mesas/lista-mesas.component';
import { NuevaMesaComponent } from './mesas/nueva-mesa/nueva-mesa.component';
import { EditarMesaComponent } from './mesas/editar-mesa/editar-mesa.component';
import { ListaReservasComponent } from './reservas/lista-reservas/lista-reservas.component';
import { NuevaReservaComponent } from './reservas/nueva-reserva/nueva-reserva.component';
import { EditarReservaComponent } from './reservas/editar-reserva/editar-reserva.component';
import { BusquedaClienteComponent } from './reservas/nueva-reserva/nueva-reserva.component';
import { RegistroClienteComponent } from './reservas/nueva-reserva/nueva-reserva.component';


import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SidenavComponent,
    InicioComponent,
    ListaClientesComponent,
    NuevoClienteComponent,
    EditarClienteComponent,
    ListaRestaurantesComponent,
    NuevoRestauranteComponent,
    EditarRestauranteComponent,
    ListaMesasComponent,
    NuevaMesaComponent,
    EditarMesaComponent,
    ListaReservasComponent,
    NuevaReservaComponent,
    EditarReservaComponent,
    BusquedaClienteComponent,
    RegistroClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    //ReactiveFormsModule,
    MatSelectModule, 
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    ToastrModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
