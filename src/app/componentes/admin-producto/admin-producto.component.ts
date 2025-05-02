import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../servicios/producto.service';
import { CarritoService } from '../../servicios/carrito.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../servicios/auth.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-admin-producto',
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule],
  templateUrl: './admin-producto.component.html',
  styleUrls: ['./admin-producto.component.css']
})
export class AdminProductoComponent implements OnInit {
  productos: any[] = [];
  id_usuario: number = 1; 
  nuevoProducto = {
    id:'',
    nombre: '',
    descripcion: '',
    imagen_url: '',
    precio: 0,
    stock: 0
  };
  display = false;
  displayProductoDialog: boolean = false;


  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }
  

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe(
      (data) => {
        console.log("Respuesta completa del backend:", data);  
        if (data && data.productos) {
          console.log("Productos:", data.productos);  
          this.productos = data.productos;
          this.productos.forEach(producto => {
            console.log('Producto:', producto);  
            console.log('ID del producto:', producto.id); 
          });
          
          // Establecer cantidad para todos los productos
          this.productos.forEach(producto => producto.cantidad = 1);
        } else {
          console.error("No se encontraron productos en la respuesta.");
        }
      },
      (error) => {
        console.error('Error al obtener productos:', error);  // Si hay error, lo imprime aquí
      }
    );
  }

  getImageUrl(imagen: string): string {
    return '/images/' + imagen;  
  }


  editarProducto(producto: any) {
    this.nuevoProducto = { ...producto }; // Copia el producto actual al formulario
    this.displayProductoDialog = true;    // Abre el diálogo para editar
  }
  
  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.obtenerProductos(); // Vuelve a cargar la lista
      });
    }
  }
  
  guardarProducto() {
    if (this.nuevoProducto.id) {
      // Si tiene ID, es edición
      this.productoService.actualizarProducto(this.nuevoProducto).subscribe(() => {
        this.obtenerProductos();
        this.displayProductoDialog = false;
      });
    } else {
      // Si no tiene ID, es nuevo
      this.productoService.agregarProducto(this.nuevoProducto).subscribe(() => {
        this.obtenerProductos();
        this.displayProductoDialog = false;
      });
    }
  }
  
  

}
