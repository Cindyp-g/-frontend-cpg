import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../servicios/producto.service';
import { CarritoService } from '../../servicios/carrito.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-producto',
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: any[] = [];
  id_usuario: number = 1; 

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
  
  

  agregarAlCarrito(id: number, cantidad: number) {
    console.log("Producto a agregar al carrito:", id, cantidad);  
    
    if (!this.id_usuario || !id || !cantidad) {
      console.error("Faltan datos para agregar al carrito:", {
        id_usuario: this.id_usuario,
        id,
        cantidad
      });
      return;
    }
  
    console.log("Llamando al servicio para agregar al carrito...");
  
    this.carritoService.agregarAlCarrito(this.id_usuario, id, cantidad).subscribe(
      () => console.log(`Producto ${id} agregado con cantidad ${cantidad}`),
      (error) => console.error("Error al agregar al carrito:", error)
    );
  }
  

  getImageUrl(imagen: string): string {
    return '/images/' + imagen;  
  }
}
