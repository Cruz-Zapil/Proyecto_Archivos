import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ShellComponent } from './app/shared/layout/shell.component';


import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(ShellComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});