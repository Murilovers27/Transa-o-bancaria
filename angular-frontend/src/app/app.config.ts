import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Habilita o HttpClient
import { FormsModule } from '@angular/forms'; // Habilita o ngModel

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // <-- Adiciona o provider HTTP
    importProvidersFrom(FormsModule) // <-- Adiciona o provider de Formulários
  ]
};