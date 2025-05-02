import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../servicios/categoria.service';
import { Categoria } from '../../interfaces/categoria';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-admin-categoria',
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule],
  templateUrl: './admin-categoria.component.html',
  styleUrls: ['./admin-categoria.component.css']
})
export class AdminCategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  displayCategoriaDialog: boolean = false;
  nuevaCategoria = {
    id:'',
    nombre: '',
    imagen_url: '',
  };

  constructor(private categoriaService: CategoriaService) { }

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

  editarCategoria(categoria: any) {
    this.nuevaCategoria = { ...categoria }; 
    this.displayCategoriaDialog = true;    
  }

  guardarCategoria() {
    if (this.nuevaCategoria.id) {
      // Si tiene ID, es edición
      this.categoriaService.actualizarCategoria(Number(this.nuevaCategoria.id), this.nuevaCategoria).subscribe(() => {
        this.obtenerCategorias();
        this.displayCategoriaDialog = false;
      });
    } else {
      // Si no tiene ID, es nuevo
      this.categoriaService.agregarCategoria(this.nuevaCategoria).subscribe(() => {
        this.obtenerCategorias();
        this.displayCategoriaDialog = false;
      });
    }
  }
  
  

  eliminarCategoria(categoria: Categoria): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(categoria.id).subscribe(
        () => {
          this.obtenerCategorias();
        },
        (error) => {
          console.error('Error al eliminar categoría', error);
        }
      );
    }
  }

  getImageUrl(imagen: string): string {
    return '/images/' + imagen;
  }
}
