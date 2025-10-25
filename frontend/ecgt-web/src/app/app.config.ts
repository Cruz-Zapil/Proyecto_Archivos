import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';


import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { authErrorInterceptor } from './core/interceptors/auth-error.interceptor';

/**
 * AppConfig: aquí “conectamos” router y HTTP con el interceptor.
 *
 */

export const appConfig: ApplicationConfig = {
  providers: [
   
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor, authErrorInterceptor])),
  ],
};