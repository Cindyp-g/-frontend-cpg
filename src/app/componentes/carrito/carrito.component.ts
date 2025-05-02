import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
import { OrdenService } from '../../servicios/orden.service'; 
import { AuthService } from '../../servicios/auth.service';


@Component({
  selector: 'app-carrito',
  imports: [CommonModule, FormsModule, ButtonModule], 
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  id_usuario:number;
  carrito: any[] = [];
  total: number = 0;
  cartItems: any[] = [];
  id_producto:number = 0;

  constructor(
    private http: HttpClient,
    private carritoService: CarritoService,
    private ordenService: OrdenService,
    private router: Router,
    private authService: AuthService
  ) {
    this.id_usuario = this.authService.getUserId();
    if (!this.id_usuario) {
      console.error("No se encontró el ID de usuario. Redirigiendo a login...");
      this.router.navigate(['/login']);
      return;
    }
    this.obtenerCarrito();
  }

  obtenerCarrito() {
    this.carritoService.obtenerCarrito(this.id_usuario).subscribe(
      (response: any) => {
        if (Array.isArray(response.carrito)) {
          this.carrito = response.carrito;
          this.calcularTotal();
        } else {
          console.warn('Estructura de datos inesperada:', response);
        }
      },
      (error) => console.error('Error al obtener carrito:', error)
    );
  }
  
  

  agregarAlCarrito(id_producto: number, cantidad: number = 1) {
    this.carritoService.agregarAlCarrito(this.id_usuario, id_producto, cantidad).subscribe(
      (response) => {
        console.log('Producto agregado:', response);
        this.obtenerCarrito();
      },
      (error) => console.error('Error al agregar al carrito:', error)
    );
  }
  
  
  
    calcularTotal() {
    if (this.carrito.length === 1 && this.carrito[0].cantidad === 1) {
      this.total = this.carrito[0].precio;
    } else {
      this.total = this.carrito.reduce((sum, item) => {
        const totalItem = item.precio * item.cantidad;
        console.log(`Producto: ${item.nombre}, Precio: ${item.precio}, Cantidad: ${item.cantidad}, Total: ${totalItem}`);
        return sum + totalItem;
      }, 0);
    }
  }
  
  

  eliminarProducto(id_producto: number) {
    console.log(`Intentando eliminar producto con ID: ${id_producto}`);
    
    if (!this.id_usuario) {
      console.error("No se encontró el ID de usuario.");
      return;
    }
  
    if (!id_producto || typeof id_producto !== 'number') {
      console.error("ID de producto inválido:", id_producto);
      return;
    }
  
    this.carritoService.eliminarDelCarrito(this.id_usuario, id_producto).subscribe(
      () => {
        console.log(`Producto ${id_producto} eliminado del carrito.`);
        this.obtenerCarrito();
      },
      (error) => console.error('Error al eliminar producto:', error)
    );
  }
  
  


  // Actualizar la cantidad de un producto
  actualizarCantidad(item: any) {
    this.http.put('http://localhost:3000/carrito', item).subscribe(
      (response) => {
        console.log('Cantidad actualizada:', response);
        this.calcularTotal(); // Vuelve a calcular el total
      },
      (error) => {
        console.error('Error al actualizar la cantidad:', error);
      }
    );
  }


  hacerOrden(): void {
    if (!this.id_usuario) {
      console.error("No se encontró el ID de usuario. Redirigiendo a login...");
      this.router.navigate(['/login']);
      return;
    }
  
    if (this.carrito.length === 0) {
      console.error("No hay productos en el carrito.");
      return;
    }
  
    const orderData = {
      usuario_id: this.id_usuario,
      total: this.total,
      estado: 'pendiente',
      productos: this.carrito.map(item => ({
        id_producto: item.id_producto,
        nombre: item.nombre_producto,
        cantidad: item.cantidad,
        precio: item.precio
      }))
    };
  
    this.ordenService.createOrder(orderData).subscribe(
      (response) => {
        console.log('Orden realizada:', response);
  
        if (response.result && response.result.insertId) {
          const ordenId = response.result.insertId;
          
          // 🔹 Guardar el ID de la orden en sessionStorage
          this.ordenService.setOrderId(ordenId);
  
          // 🔹 Navegar a la página de orden sin necesidad de la URL
          this.router.navigate(['/orden']);
        } else {
          console.error("No se recibió un ID de orden en la respuesta.");
        }
      },
      (error) => {
        console.error('Error al crear la orden', error);
      }
    );
  }
  
  

}
