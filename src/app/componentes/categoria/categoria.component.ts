import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../servicios/categoria.service'; 
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria',
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: any[] = [];
  productos: any[] = [];

  constructor(
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias(); 
  }

  obtenerCategorias() {
    this.categoriaService.obtenerCategorias().subscribe(
      (data) => {
        this.categorias = data.categorias;
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  getImageUrl(imagen: string): string {
    return '/images/' + imagen;  
  }


}
