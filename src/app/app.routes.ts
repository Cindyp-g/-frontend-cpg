import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ProductoListaComponent } from './componentes/producto-lista/producto-lista.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { OrdenComponent } from './componentes/orden/orden.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { AdminUsuarioComponent } from './componentes/admin-usuario/admin-usuario.component';
import { AdminProductoComponent } from './componentes/admin-producto/admin-producto.component';
import { AdminCategoriaComponent } from './componentes/admin-categoria/admin-categoria.component';
import { AdminCarritoComponent } from './componentes/admin-carrito/admin-carrito.component';


export const routes: Routes = [
    {
        path: 'login',
        component:LoginComponent
    },
    {
        path: 'registro',
        component:RegistroComponent
    },
    {
        path: '',
        component:ProductoListaComponent
    },
    {
        path: 'producto',
        component:ProductoComponent
    },
    {
        path: 'carrito',
        component:CarritoComponent
    },
    {
        path: 'orden',
        component:OrdenComponent
    },
    {
        path: 'categoria',
        component:CategoriaComponent
    },
    {
        path: 'admin',
        component:AdminComponent
    },
    {
        path: 'adminUsuario',
        component:AdminUsuarioComponent
    },
    {
        path: 'adminProducto',
        component:AdminProductoComponent
    },
    {
        path: 'adminCategoria',
        component:AdminCategoriaComponent
    },
    {
        path: 'adminCarrito',
        component:AdminCarritoComponent
    },
    
];
