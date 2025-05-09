import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { getSingleSpaExtraProviders } from 'single-spa-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withHashLocation()), 
    provideAnimations(),
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    getSingleSpaExtraProviders(),
  ]
};
