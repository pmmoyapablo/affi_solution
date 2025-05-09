import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

export const routes: Routes = [
    {
      path: 'productos/nuevo',
      loadComponent: () => import('./nuevo/nuevo.component'),
    },
    {
      path: 'productos/modificar',
      loadComponent: () => import('./modificar/modificar.component'),
    },
    {
      path: 'productos/exportar',
      loadComponent: () => import('./exportar/exportar.component'),
    },
    {
      path: 'productos/configurar',
      loadComponent: () => import('./configurar/configurar.component'),
    },
    {
      path: '**',
      component: EmptyRouteComponent,
    },
  ];
