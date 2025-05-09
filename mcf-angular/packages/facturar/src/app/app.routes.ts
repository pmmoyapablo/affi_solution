import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

export const routes: Routes = [
    {
      path: 'facturar/nueva',
      loadComponent: () => import('./nueva/nueva.component'),
    },
    {
      path: 'facturar/anular',
      loadComponent: () => import('./anular/anular.component'),
    },
    {
      path: 'facturar/imprimir',
      loadComponent: () => import('./imprimir/imprimir.component'),
    },
    {
      path: '**',
      component: EmptyRouteComponent,
    },
  ];