import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/orden`, orderData);
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/orden/${id}`);
  }

  // 🔹 Guardar el ID de la orden
  setOrderId(id: number) {
    sessionStorage.setItem('orderId', id.toString()); 
  }

  // 🔹 Obtener el ID de la orden
  getOrderId(): number | null {
    return Number(sessionStorage.getItem('orderId')) || null;
  }
}
