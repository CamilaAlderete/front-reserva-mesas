import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  { path: '', 
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full'},
      { path: 'inicio',  component:InicioComponent},
      { path: 'clientes',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListaClientesComponent },
          { path: 'nuevo', component: NuevoClienteComponent },
          { path: ':id/editar', component: EditarClienteComponent }
        ]
      },
      { path: 'restaurantes',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListaRestaurantesComponent },
          { path: 'nuevo', component: NuevoRestauranteComponent },
          { path: ':id/editar', component: EditarRestauranteComponent }
        ]
      },
      { path: 'mesas',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListaMesasComponent },
          { path: 'nuevo', component: NuevaMesaComponent },
          { path: ':id/editar', component: EditarMesaComponent }
        ]
      },
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
