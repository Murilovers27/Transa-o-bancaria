import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movimentacao, NovaMovimentacao } from '../models/movimentacao';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {
  // A URL que será interceptada pelo proxy.conf.json e redirecionada para http://localhost:3000
  private apiUrl = '/api/movimentacoes'; 
  
  // Mock temporário de Categorias (Substituir por chamada de API no futuro)
  private mockCategorias: Categoria[] = [
    { _id: '60c72b8f9f1b2c001c8e4d3a', nome: 'Salário' },
    { _id: '60c72b8f9f1b2c001c8e4d3b', nome: 'Aluguel' },
    { _id: '60c72b8f9f1b2c001c8e4d3c', nome: 'Supermercado' },
    { _id: '60c72b8f9f1b2c001c8e4d3d', nome: 'Investimento' },
  ];

  constructor(private http: HttpClient) { }

  // --- MÉTODOS CRUD DE MOVIMENTAÇÕES ---

  getMovimentacoes(): Observable<Movimentacao[]> {
    return this.http.get<Movimentacao[]>(this.apiUrl); // READ
  }

  criarMovimentacao(movimentacao: NovaMovimentacao): Observable<Movimentacao> {
    return this.http.post<Movimentacao>(this.apiUrl, movimentacao); // CREATE
  }

  deletarMovimentacao(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`); // DELETE
  }

  // --- MÉTODOS DE CATEGORIAS ---
  
  getCategorias(): Observable<Categoria[]> {
    return of(this.mockCategorias); // Retorna o Mock de Categorias
  }
}