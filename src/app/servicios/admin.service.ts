import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/usuarios`);
  }

  // Agregar un nuevo usuario
  addUser(usuario: User): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/usuarios`, usuario);
  }

  // Eliminar un usuario por su ID
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/usuarios/${userId}`);
  }
}
