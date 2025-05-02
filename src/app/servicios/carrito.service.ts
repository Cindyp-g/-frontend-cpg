import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface carrito {
  id_producto: number;
  id_usuario: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:3000/carrito'; 

  constructor(private http: HttpClient) {}

  obtenerCarrito(id_usuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id_usuario}`);
  }


  agregarAlCarrito(id_usuario: number, id_producto: number, cantidad: number) {
    return this.http.post(`${this.apiUrl}`, { id_usuario, id_producto, cantidad });
  }
  

  eliminarDelCarrito(id_usuario: number, id_producto: number): Observable<any> {
    return this.http.request('delete', this.apiUrl, { body: { id_usuario, id_producto } });
  }


  // Eliminar una categoría
  eliminarCategoria(id: number): Observable<any> {
    return this.http.request('delete', this.apiUrl, { body: { id } });
  }


}
