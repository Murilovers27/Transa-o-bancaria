// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { FinanceiroService, Movimentacao } from './services/financeiro';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gestor Pessoal Itau Clone';
  
  // Dados do Dashboard e Listagem
  saldoTotal: number | undefined;
  movimentacoes: Movimentacao[] = [];

  // Dados para o Novo Formulário
  novaMovimentacao: Partial<Movimentacao> = {
    tipo: 'receita', // Valor padrão
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
    // 1. Busca o Saldo
    this.financeiroService.getSaldo().subscribe({
      next: (res) => {
        this.saldoTotal = res.data.saldo;
      },
      error: (err) => console.error('Erro ao buscar saldo:', err)
    });

    // 2. Busca a Lista de Movimentações
    this.financeiroService.getMovimentacoes().subscribe({
      next: (res) => {
        // Assume que a resposta tem a estrutura { data: [...] }
        this.movimentacoes = res.data;
      },
      error: (err) => console.error('Erro ao buscar movimentações:', err)
    });
  }

  // 3. Adicionar Nova Movimentação
  onSubmit() {
    // Garante que os campos obrigatórios estão preenchidos
    if (!this.novaMovimentacao.valor || !this.novaMovimentacao.descricao) {
      alert('Preencha o valor e a descrição.');
      return;
    }

    this.financeiroService.addMovimentacao(this.novaMovimentacao as Movimentacao).subscribe({
      next: (res) => {
        alert('Movimentação adicionada com sucesso!');
        this.fetchData(); // Atualiza a lista e o saldo
        
        // Limpa o formulário
        this.novaMovimentacao = {
          tipo: 'receita',
          valor: undefined,
          descricao: '',
          categoria: '',
          data: new Date()
        };
      },
      error: (err) => console.error('Erro ao adicionar:', err)
    });
  }
  
  // 4. Deletar Movimentação
  deletarMovimentacao(id: string) {
    if (confirm('Tem certeza que deseja deletar esta movimentação?')) {
      this.financeiroService.deleteMovimentacao(id).subscribe({
        next: () => {
          alert('Movimentação deletada!');
          this.fetchData(); // Atualiza a lista e o saldo
        },
        error: (err) => console.error('Erro ao deletar:', err)
      });
    }
  }
}