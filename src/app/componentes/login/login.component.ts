import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModprimengModule } from '../../modprimeng.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/user';
import { Mensaje } from '../../interfaces/mensaje';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ModprimengModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForma: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private messageService: MessageService) {
    this.loginForma = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
      ]],
    });
  }

  get email() {
    return this.loginForma.get('email');
  }

  get password() {
    return this.loginForma.get('password');
  }

  login() {
    const { email, password } = this.loginForma.value;
    const usuario: User = {
      id: "",
      name: "",
      email: email,
      password: password,
      role:'',
  
    };

    this.authService.getUserByEmail(usuario as User).subscribe(
      (response) => {
        console.log("Respuesta completa del backend:", response);
  
        if (response.code === 200 && response.user) {
          sessionStorage.setItem('email', response.user.email);
          localStorage.setItem('userId', response.user.id.toString());
          sessionStorage.setItem('role', response.user.role);  
          console.log("Rol del usuario después de recibir la respuesta:", response.user.role);
  
          const role = this.authService.getUserRole();
          console.log("Rol del usuario desde AuthService:", role);
  
          if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
  
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email o Contraseña Incorrecta' });
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error en la autenticación.' });
      }
    );
  }
}
