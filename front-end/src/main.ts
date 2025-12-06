// front-end/src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // Certifique-se de que o caminho está correto

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));