import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ProductoListaComponent } from './componentes/producto-lista/producto-lista.component';

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
    }

    
];
