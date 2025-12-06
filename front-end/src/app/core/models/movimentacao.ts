import { Categoria } from './categoria';

export type TipoMovimentacao = 'receita' | 'despesa';

// Estrutura para dados que VÊM do Backend
export interface Movimentacao {
  _id: string; 
  descricao: string;
  valor: number;
  data: string;
  tipo: TipoMovimentacao;
  categoria: Categoria; 
}

// Estrutura para dados que VÃO para o Backend (Cadastro)
export interface NovaMovimentacao {
  descricao: string;
  valor: number;
  data: string;
  tipo: TipoMovimentacao;
  categoriaId: string; // Envia apenas o ID da categoria
}