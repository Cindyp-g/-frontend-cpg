import { Component,OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
  selector: 'app-toolbar',
  imports: [ButtonModule, SplitButton, InputTextModule, IconField, InputIcon],
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit{

    categorias: MenuItem[] = [];
    perfilItems: MenuItem[] = [];


    ngOnInit() {
        this.categorias = [
            { label: 'Vestidos', icon: 'pi pi-tablet', command: () => this.filtrarCategoria('Vestidos') },
            { label: 'Camisas', icon: 'pi pi-tshirt', command: () => this.filtrarCategoria('Camisas') },
            { label: 'Shorts', icon: 'pi pi-home', command: () => this.filtrarCategoria('shorts') }
          ];
      
          this.perfilItems = [
            {
                label: 'Ingresar',
                icon: 'pi pi-user',
                routerLink:'/login'
            },
            {
                label: 'Registrar',
                icon: 'pi pi-pencil',
                routerLink:'/registro'
            }
          ];
        }
      
        filtrarCategoria(categoria: string) {
          console.log('Filtrar por:', categoria);
        }


}
