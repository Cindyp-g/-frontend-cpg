import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { MessageService } from 'primeng/api';
import { ModprimengModule } from '../../modprimeng.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { User } from '../../interfaces/user';
import { ReactiveFormsModule } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/pasword-match.directives';

@Component({
  selector: 'app-admin-usuario',
  imports: [ModprimengModule, RouterModule, CommonModule, DialogModule, ReactiveFormsModule],
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css'],
  providers: [MessageService]
})
export class AdminUsuarioComponent implements OnInit {
  usuarios: User[] = [];
  userRole: string | null = null; 
  addUserForm: FormGroup;  
  display = false;
  editMode: boolean = false;
  selectedUserId: number | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder, private messageService: MessageService, private router: Router) {
    // Inicialización del formulario con validaciones
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
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

  ngOnInit(): void {
    // Obtener el rol del usuario al cargar el componente
    this.userRole = this.authService.getUserRole();

    // Si el rol es 'admin', puedes hacer alguna acción o mostrar algo específico
    if (this.userRole === 'admin') {
      // Lógica si el usuario es admin
      console.log('Usuario es admin');
    } else {
      // Lógica para otros roles, si es necesario
      console.log('Usuario no es admin');
    }

    // También puedes obtener los usuarios si es necesario
    this.obtenerUsuarios();
  }
  
  obtenerUsuarios() {
    this.authService.getUsuarios().subscribe(
      res => {
        console.log('Usuarios recibidos:', res);
        this.usuarios = res.usuarios; 
      },
      err => {
        console.error(err);
      }
    );
  }
  
  openAddUserDialog(): void {
    this.display = true;
  }

  addUser() {
    const userData = { ...this.addUserForm.value };
    delete userData.confirmPassword;  // Eliminar confirmPassword antes de enviar al backend
  
    if (this.editMode) {
      // Si estamos en modo de edición, actualizamos el usuario
      userData.id = this.selectedUserId;  // Asegúrate de enviar el ID del usuario
      this.updateUser(userData);  // Llamar al método para actualizar
    } else {
      // Si estamos en modo de creación, agregamos un nuevo usuario
      this.authService.addUser(userData as User).subscribe(
        response => {
          this.messageService.add({
            severity: 'success', summary: 'Éxito',
            detail: 'Usuario agregado con éxito'
          });
          this.display = false;
          this.addUserForm.reset();
          this.obtenerUsuarios();
        },
        error => {
          console.error(error);
          this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: 'No se pudo agregar el usuario'
          });
        }
      );
    }
  }
  
  


  editUser(usuario: any) {
    this.editMode = true;  
    this.display = true;
    this.selectedUserId = usuario.id;  
  

    this.addUserForm.patchValue({
      name: usuario.name,
      email: usuario.email,
      password: '',  
      confirmPassword: '',
      role: usuario.role
    });
  }
  
  
  
  updateUser(userData: User) {
    this.authService.updateUser(userData).subscribe(
      response => {
        this.messageService.add({
          severity: 'success', summary: 'Éxito',
          detail: 'Usuario actualizado correctamente'
        });
        this.display = false;
        this.addUserForm.reset();
        this.obtenerUsuarios();
        this.editMode = false;  // Resetear el modo edición después de actualizar
        this.selectedUserId = null;  // Limpiar el ID seleccionado
      },
      error => {
        console.error('Error al actualizar usuario:', error);
        this.messageService.add({
          severity: 'error', summary: 'Error',
          detail: 'No se pudo actualizar el usuario'
        });
      }
    );
  }
  
  
  
  

  // Método para eliminar un usuario
  deleteUser(usuario: User): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.authService.deleteUser(usuario).subscribe(
        response => {
          // Filtrar el usuario eliminado de la lista en el frontend
          this.usuarios = this.usuarios.filter(user => user.id !== usuario.id);
          this.messageService.add({
            severity: 'success', summary: 'Usuario eliminado',
            detail: 'El usuario fue eliminado correctamente'
          });
        },
        error => {
          console.error('Error al eliminar usuario', error);
          this.messageService.add({
            severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el usuario'
          });
        }
      );
    }
  }

  cancelar() {
    this.display = false;
    this.addUserForm.reset();
    this.editMode = false;  
    this.selectedUserId = null;  
  }
  

  get id() {
    return this.addUserForm.get('id');
  }

  get role() {
    return this.addUserForm.get('role');
  }


  get name() {
    return this.addUserForm.get('name');
  }

  get email() {
    return this.addUserForm.get('email');
  }

  get password() {
    return this.addUserForm.get('password');
  }

  get confirmPassword() {
    return this.addUserForm.get('confirmPassword');
  }

}
