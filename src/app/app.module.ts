import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';  // Importamos RouterModule y Routes
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ProductoListaComponent } from './componentes/producto-lista/producto-lista.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { OrdenComponent } from './componentes/orden/orden.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { ModprimengModule } from './modprimeng.module'; // Importamos el módulo de PrimeNG

// Definimos las rutas directamente aquí
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', component: ProductoListaComponent }, // Página de inicio
  { path: 'producto', component: ProductoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'orden/:id', component: OrdenComponent },
  { path: 'categoria', component: CategoriaComponent },
];

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),  // Aquí declaramos las rutas directamente
    ModprimengModule,  // Importamos el módulo de PrimeNG
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {}
