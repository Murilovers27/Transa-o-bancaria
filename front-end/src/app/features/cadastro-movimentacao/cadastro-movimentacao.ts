import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FinanceiroService } from '../../core/services/financeiro.service';
import { Categoria } from '../../core/models/categoria';
import { NovaMovimentacao } from '../../core/models/movimentacao';

@Component({
  selector: 'app-cadastro-movimentacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-movimentacao.component.html',
  styleUrls: ['./cadastro-movimentacao.component.css']
})
export class CadastroMovimentacaoComponent implements OnInit {
  
  // Emite um evento para o componente pai (Lista) recarregar os dados
  @Output() movimentacaoCriada = new EventEmitter<void>();

  formularioMovimentacao!: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private financeiroService: FinanceiroService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    // Inicializa o formulário com o tipo padrão 'despesa'
    this.formularioMovimentacao = this.fb.group({
      descricao: ['', Validators.required],
      valor: [0.01, [Validators.required, Validators.min(0.01)]],
      data: ['', Validators.required],
      tipo: ['despesa', Validators.required], 
      categoriaId: ['', Validators.required]
    });
  }

  carregarCategorias(): void {
    this.financeiroService.getCategorias().subscribe(data => {
      this.categorias = data;
      // Define a primeira categoria como padrão
      if (this.categorias.length > 0) {
        this.formularioMovimentacao.get('categoriaId')?.setValue(this.categorias[0]._id);
      }
    });
  }

  onSubmit(): void {
    if (this.formularioMovimentacao.valid) {
      // O valor do formulário já tem o formato NovaMovimentacao
      const novaMovimentacao: NovaMovimentacao = this.formularioMovimentacao.value;
      
      this.financeiroService.criarMovimentacao(novaMovimentacao).subscribe({
        next: () => {
          alert('Movimentação registrada com sucesso!');
          // Reseta o formulário, mantendo valores padrão
          this.formularioMovimentacao.reset({ tipo: 'despesa', valor: 0.01, categoriaId: this.categorias[0]?._id || '' }); 
          this.movimentacaoCriada.emit(); 
        },
        error: (err) => {
          console.error('Erro ao registrar movimentação:', err);
          alert('Falha ao comunicar com o backend.');
        }
      });
    }
  }
}