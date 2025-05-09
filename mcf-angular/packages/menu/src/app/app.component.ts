import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, RouterLink, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Clientes',
        icon: 'pi pi-fw pi-user',
        routerLink: ['clientes'],
        items: [
          {
            label: 'Nuevo',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: ['clientes/nuevo'],
          },
          {
            label: 'Modificar',
            icon: 'pi pi-fw pi-user-edit',
            routerLink: ['clientes/modificar'],
          },
          {
            label: 'Configurar',
            icon: 'pi pi-fw pi-cog',
            routerLink: ['clientes/configurar'],
          },

          {
            label: 'Exportar',
            icon: 'pi pi-fw pi-file-pdf',
            routerLink: ['clientes/exportar'],
          },
        ],
      },
      {
        label: 'Productos',
        icon: 'pi pi-fw pi-cart-plus',
        routerLink: ['productos'],
        items: [
          {
            label: 'Nuevo',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['productos/nuevo'],
          },
          {
            label: 'Modificar',
            icon: 'pi pi-fw pi-file-edit',
            routerLink: ['productos/modificar'],
          },
          {
            label: 'Configurar',
            icon: 'pi pi-fw pi-wrench',
            routerLink: ['productos/configurar'],
          },

          {
            label: 'Exportar',
            icon: 'pi pi-fw pi-file-export',
            routerLink: ['productos/exportar'],
          },
        ],
      },
      {
        label: 'Facturar',
        icon: 'pi pi-fw pi-money-bill',
        routerLink: ['facturar'],
        items: [
          {
            label: 'Nueva',
            icon: 'pi pi-fw pi-money-bill',
            routerLink: ['facturar/nueva'],
          },
          {
            label: 'Anular',
            icon: 'pi pi-fw pi-ban',
            routerLink: ['facturar/anular'],
          },
          {
            label: 'Imprimir',
            icon: 'pi pi-fw pi-print',
            routerLink: ['facturar/imprimir'],
          },
        ],
      },
      {
        label: 'Reportes',
        icon: 'pi pi-fw pi-chart-line',
        routerLink: ['reportes'],
        items: [
          {
            label: 'Clientes',
            icon: 'pi pi-fw pi-users',
            routerLink: ['reportes/clientes'],
            items: [
              {
                label: 'Todos',
                icon: 'pi pi-fw pi-align-justify',
                routerLink: ['reportes/clientes/todos'],
              },
              {
                label: 'Con Factura',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['reportes/clientes/con-factura'],
              },
            ],
          },
          {
            label: 'Productos',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: ['productos'],
            items: [
              {
                label: 'Todos',
                icon: 'pi pi-fw pi-align-justify',
                routerLink: ['productos/todos'],
              },
            ],
          },
        ],
      },
    ];
  }
}
