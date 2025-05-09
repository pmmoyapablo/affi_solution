import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

export const routes: Routes = [
  {
    path: 'clientes/nuevo',
    loadComponent: () => import('./nuevo/nuevo.component'),
  },
  {
    path: 'clientes/modificar',
    loadComponent: () => import('./modificar/modificar.component'),
  },
  {
    path: 'clientes/exportar',
    loadComponent: () => import('./exportar/exportar.component'),
  },
  {
    path: 'clientes/configurar',
    loadComponent: () => import('./configurar/configurar.component'),
  },
  {
    path: '**',
    component: EmptyRouteComponent,
  },
];
