import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../servicios/orden.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-orden',
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
  orden: any = {}; // Aquí almacenaremos la orden
  ordenId!: number; // ID de la orden

  constructor(private ordenService: OrdenService) {}

  ngOnInit(): void {
    // 🔹 Obtener el ID de la orden desde sessionStorage
    const id = this.ordenService.getOrderId(); 
    
    if (id) {
      this.ordenId = id; 
      console.log("ID de la orden obtenido de sessionStorage:", this.ordenId);
      this.getOrderById(this.ordenId);
    } else {
      console.error("No se encontró un ID de orden almacenado.");
    }
  }

  getOrderById(id: number): void {
    this.ordenService.getOrderById(id).subscribe(
      (response) => {
        if (response) {
          this.orden = response;
          console.log("Orden obtenida:", this.orden);
        } else {
          console.error("No se encontró la orden en la respuesta.");
        }
      },
      (error) => {
        console.error('Error al obtener la orden:', error);
      }
    );
  }
}
