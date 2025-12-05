// src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <-- Importação HTTP Standalone
import { FormsModule } from '@angular/forms'; // <-- Módulo de Formulários

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // <--- ADICIONAR AQUI para requisições HTTP
    importProvidersFrom(FormsModule) // <--- ADICIONAR AQUI para [(ngModel)]
  ]
};