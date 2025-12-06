// front-end/src/app/app.component.ts (ou app.ts)

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importe o RouterOutlet
import { CommonModule } from '@angular/common'; // Geralmente necessário

@Component({
  selector: 'app-root',
  standalone: true,
  // Adicione RouterOutlet e CommonModule nos imports
  imports: [CommonModule, RouterOutlet], 
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'GestorFinanceiroPessoal';
}