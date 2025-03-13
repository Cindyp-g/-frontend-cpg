import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:3000';


  constructor(private http:HttpClient) { }


  registroUsuario(usuario: User) {
    return this.http.post(`${this.baseURL}/usuario`, usuario);
  }
}