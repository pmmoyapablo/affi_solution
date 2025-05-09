import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Message, MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { TokenRequest } from '../models/auth.model';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    DividerModule,
    CardModule,
    InputTextModule,
    FormsModule,
    MessagesModule,
    CommonModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<boolean>();

  constructor(private messageService: MessageService, 
    private authService: AuthService){ }

  email!: string;
  password!: string;
  messages: Message[] | undefined;


  async login() {
      this.messageService.clear();

      const credentials: TokenRequest = {
        username: this.email,
        password: this.password
      }
      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (response.auth) {
            this.authService.setToken(response.token);
            this.loginSuccess.emit(true);
            this.messageService.add({
              severity: 'success',
              summary: 'Ingreso',
              detail: 'Usuario autenticado con éxito',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                '¡Usuario no encontrado. Por favor, regístrese antes de iniciar sesión.!',
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: '¡Se produjo un error durante la autenticación!',
          });
        }
      });   
  }
}
