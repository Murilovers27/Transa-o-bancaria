import { Routes } from '@angular/router';
// Importação corrigida. O caminho é relativo à pasta 'app/'
// e aponta para o arquivo TypeScript do componente.
import { ListaMovimentacoesComponent } from './pages/lista-movimentacoes/lista-movimentacoes';

export const routes: Routes = [
  
  { 
    path: '', 
    component: ListaMovimentacoesComponent 
  },
  
  // 2. Rota Curinga (Wildcard)
  // Redireciona qualquer URL não reconhecida para a rota principal.
  { 
    path: '**', 
    redirectTo: '' 
  }
];