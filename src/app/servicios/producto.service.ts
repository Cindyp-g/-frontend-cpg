import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/producto';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<{ productos: Producto[] }> { 
    return this.http.get<{ productos: Producto[] }>(this.apiUrl);
  }

  agregarProducto(producto: any) {
    return this.http.post<any>('http://localhost:3000/producto', producto);
  }

  actualizarProducto(producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/`, producto);
  }  
  
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  
}