import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceiroService } from '../../core/services/financeiro.service';
import { Movimentacao } from '../../core/models/movimentacao';
// Caminho de 'pages' para 'features'
import { CadastroMovimentacaoComponent } from '../../features/cadastro-movimentacao/cadastro-movimentacao';
@Component({
  selector: 'app-lista-movimentacoes',
  standalone: true,
  // Importa o módulo comum (ngFor, ngIf, pipes) e o componente de Cadastro
  imports: [CommonModule, CadastroMovimentacaoComponent], 
  templateUrl: './lista-movimentacoes.component.html',
  styleUrls: ['./lista-movimentacoes.component.css']
})
export class ListaMovimentacoesComponent implements OnInit {
  
  movimentacoes: Movimentacao[] = [];
  saldoTotal: number = 0;
  totalReceitas: number = 0;
  totalDespesas: number = 0;

  constructor(private financeiroService: FinanceiroService) { }

  ngOnInit(): void {
    // Carrega os dados na inicialização
    this.carregarMovimentacoes(); 
  }

  /**
   * Obtém a lista da API e atualiza os totais.
   */
  carregarMovimentacoes(): void {
    this.financeiroService.getMovimentacoes()
      .subscribe({
        next: (data) => {
          this.movimentacoes = data;
          this.calcularSaldo();
        },
        error: (error) => {
          console.error('Erro ao carregar movimentações:', error);
          alert('Falha ao conectar com o backend (porta 3000).');
        }
      });
  }

  /**
   * Calcula Saldo, Receitas e Despesas totais.
   */
  calcularSaldo(): void {
    this.totalReceitas = this.movimentacoes
      .filter(m => m.tipo === 'receita')
      .reduce((soma, m) => soma + m.valor, 0);

    this.totalDespesas = this.movimentacoes
      .filter(m => m.tipo === 'despesa')
      .reduce((soma, m) => soma + m.valor, 0);

    this.saldoTotal = this.totalReceitas - this.totalDespesas;
  }
  
  /**
   * Deleta uma movimentação e recarrega a lista.
   */
  deletarMovimentacao(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta movimentação?')) {
      this.financeiroService.deletarMovimentacao(id)
        .subscribe({
          next: () => {
            alert('Movimentação excluída com sucesso!');
            this.carregarMovimentacoes(); // Recarrega para atualizar a UI
          },
          error: (err) => {
            console.error('Erro ao deletar:', err);
            alert('Falha ao excluir a movimentação.');
          }
        });
    }
  }

}