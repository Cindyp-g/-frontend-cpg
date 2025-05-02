import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModprimengModule } from '../../modprimeng.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../shared/pasword-match.directives';
import { AuthService } from '../../servicios/auth.service';
import { User } from '../../interfaces/user';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, ModprimengModule, RouterModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registerForma: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private messageService: MessageService, private router:Router) {
    this.registerForma = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/),
        ]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: passwordMatchValidator 
      }
    );
  }

  get name() {
    return this.registerForma.get('name');
  }

  get email() {
    return this.registerForma.get('email');
  }

  get password() {
    return this.registerForma.get('password');
  }

  get confirmPassword() {
    return this.registerForma.get('confirmPassword');
  }

  enviarRegistro() {
    const data = {...this.registerForma.value};
     
    delete data.confirmPassword;
     console.log (data)
    
    this.authService.registroUsuario(data as User).subscribe(
      Response => {console.log (Response)
        this.messageService.add({severity: 'success', summary: 'success',
          detail: 'Registro Agregado con éxito'
        })
        this.router.navigate(['/'])
      },
      error => console.log(error)
    )

  }
}
