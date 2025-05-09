import { Component, OnInit } from '@angular/core';
import { RouterLink , Router} from '@angular/router';
import { getMenu } from '@ventas/utils';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, RouterLink,ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  menuItems: MenuItem[] = [];
  cdr: any;

  constructor(private router: Router) {}


  ngOnInit() {
    getMenu().then((data: any) => {
      this.menuItems = data;
      
    });
    
  }

  logout() {
    sessionStorage.removeItem('idTokenFirebase');
    this.router.navigate(['/']);
    location.reload();
  }

 
}
