import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Mensaje } from '../interfaces/mensaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:3000';
  userId: number | null = null;

  constructor(private http: HttpClient) { }

  // Método para registrar usuario
  registroUsuario(usuario: User) {
    console.log("usuario ", usuario);
    return this.http.post(`${this.baseURL}/usuario`, usuario);
  }

  // Método para obtener un usuario por su correo electrónico
  getUserByEmail(usuario: User): Observable<Mensaje> {
    console.log("Datos enviados al backend:", usuario);
    return this.http.post<Mensaje>(`${this.baseURL}/usuario/email`, usuario);
  }

  setUserId(id: number) {
    this.userId = id;
  }

  getUserId(): number {
    return Number(sessionStorage.getItem('userId')) || Number(localStorage.getItem('userId'));
  }

  obtenerUsuarioActual(): Observable<any> {
    return this.http.get(`${this.baseURL}/usuarioActual`);
  }

  getUserRole(): string | null {
    return sessionStorage.getItem('role') || localStorage.getItem('role');
  }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/usuario`);
  }



  deleteUser(usuario: User): Observable<Mensaje> {
    return this.http.delete<Mensaje>(`${this.baseURL}/usuario/${usuario.id}`);
  }
  

  addUser(usuario: User) {
    console.log("usuario ", usuario);
    return this.http.post(`${this.baseURL}/usuario`, usuario);
  }
  
  

  updateUser(userData: any) {
    return this.http.put('http://localhost:3000/usuario', userData);
  }
  



}
