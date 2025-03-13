import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModprimengModule } from '../../modprimeng.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ModprimengModule, RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForma: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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

  onSubmit() {
    if (this.loginForma.valid) {
      console.log('Formulario válido:', this.loginForma.value);
      this.router.navigate(['/dashboard']); 
    }
  }
}
