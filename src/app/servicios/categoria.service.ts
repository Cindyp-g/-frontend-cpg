import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // URL de la API donde se obtienen las categorías
  private apiUrl = 'http://localhost:3000/categoria';

  constructor(private http: HttpClient) {}

  // Método para obtener todas las categorías
  obtenerCategorias(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Agregar una nueva categoría
  addCategoria(categoriaData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, categoriaData);
  }

  agregarCategoria(categoria: any) {
    return this.http.post<any>('http://localhost:3000/categoria', categoria);
  }

  actualizarCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, categoria); 
  }
   

  // Eliminar una categoría
  deleteCategoria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
  
  }
  
