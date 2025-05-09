import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { isAuthenticated, addClientes, getMenu } from '@ventas/utils';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    LoginComponent,
    CommonModule,
    MessagesModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  userAutenticado: boolean = false;

  updateUserStatus(authenticated: boolean) {
    this.userAutenticado = authenticated;

    this.cdr.detectChanges();
  }

  title = 'layout';

  async ngOnInit(): Promise<void> {
    if (isAuthenticated()) {
     

      this.userAutenticado = true;
    } else {
      this.userAutenticado = false;
    }
  }
}
