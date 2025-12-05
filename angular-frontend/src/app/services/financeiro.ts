// src/app/services/financeiro.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface base que representa o envelope padrão do Backend: { data: ... }
export interface ApiResponse<T> {
  data: T;
}

// Interface para um item de movimentação
export interface Movimentacao {
  _id?: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  data: Date;
}

// Interface para o dado específico de saldo
export interface SaldoData {
  saldo: number;
}

const API_URL = '/api/movimentacoes'; 

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  constructor(private http: HttpClient) { }

  getMovimentacoes(): Observable<ApiResponse<Movimentacao[]>> {
    return this.http.get<ApiResponse<Movimentacao[]>>(API_URL);
  }

  getSaldo(): Observable<ApiResponse<SaldoData>> {
    return this.http.get<ApiResponse<SaldoData>>(`${API_URL}/saldo`);
  }

  addMovimentacao(movimentacao: Omit<Movimentacao, '_id'>): Observable<ApiResponse<Movimentacao>> {
    return this.http.post<ApiResponse<Movimentacao>>(API_URL, movimentacao);
  }

  deleteMovimentacao(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/${id}`);
  }
}