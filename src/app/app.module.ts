import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormComponent } from './form/form.component';

//api angular material

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
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
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

import { RouterModule, Routes } from '@angular/router';
import { ListaReservasComponent } from './reservas/lista-reservas/lista-reservas.component';
import { NuevaReservaComponent } from './reservas/nueva-reserva/nueva-reserva.component';
import { EditarReservaComponent } from './reservas/editar-reserva/editar-reserva.component';

import { ToastrModule } from 'ngx-toastr';

const appRoutes:Routes =[

  {path: '', component:InicioComponent},
  {path: 'clientes', component:ListaClientesComponent},
  {path: 'clientes/nuevo', component:NuevoClienteComponent},
  {path: 'clientes/:id/editar', component:EditarClienteComponent},
  {path: 'restaurantes', component:ListaRestaurantesComponent},
  {path: 'restaurantes/nuevo', component:NuevoRestauranteComponent},
  {path: 'restaurantes/:id/editar', component:EditarRestauranteComponent},
  {path: 'mesas', component:ListaMesasComponent},
  {path: 'mesas/nuevo', component:NuevaMesaComponent},
  {path: 'mesas/editar', component:EditarMesaComponent},


];

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
    RouterModule.forRoot(appRoutes), //routing
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
