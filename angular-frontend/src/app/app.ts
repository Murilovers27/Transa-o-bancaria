// src/app/app.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para diretivas estruturais e pipes
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { FinanceiroService, Movimentacao } from './services/financeiro'; // <-- Importação SEM o .service

@Component({
  selector: 'app-root',
  standalone: true, // Necessário no modelo Standalone
  imports: [CommonModule, FormsModule], // Módulos necessários importados
  templateUrl: './app.html', 
  styleUrls: ['./app.css'] 
})
export class AppComponent implements OnInit {
  title = 'Gestor Pessoal Itau Clone';
  
  saldoTotal: number | undefined;
  movimentacoes: Movimentacao[] = [];

  novaMovimentacao: Partial<Movimentacao> = {
    tipo: 'receita', 
    valor: undefined,
    descricao: '',
    categoria: '',
    data: new Date()
  };

  constructor(private financeiroService: FinanceiroService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.financeiroService.getSaldo().subscribe({
      next: (res) => {
        this.saldoTotal = res.data.saldo;
      },
      error: (err) => console.error('Erro ao buscar saldo:', err)
    });

    this.financeiroService.getMovimentacoes().subscribe({
      next: (res) => {
        this.movimentacoes = res.data;
      },
      error: (err) => console.error('Erro ao buscar movimentações:', err)
    });
  }

  onSubmit() {
    if (!this.novaMovimentacao.valor || !this.novaMovimentacao.descricao || !this.novaMovimentacao.categoria) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    this.financeiroService.addMovimentacao(this.novaMovimentacao as Movimentacao).subscribe({
      next: (res) => {
        alert('Movimentação adicionada com sucesso!');
        this.fetchData();
        
        this.novaMovimentacao = {
          tipo: 'receita',
          valor: undefined,
          descricao: '',
          categoria: '',
          data: new Date()
        };
      },
      error: (err) => console.error('Erro ao adicionar:', err.error ? err.error.error : err)
    });
  }
  
  deletarMovimentacao(id: string) {
    if (confirm('Tem certeza que deseja deletar esta movimentação?')) {
      this.financeiroService.deleteMovimentacao(id).subscribe({
        next: () => {
          alert('Movimentação deletada!');
          this.fetchData(); 
        },
        error: (err) => console.error('Erro ao deletar:', err)
      });
    }
  }
}