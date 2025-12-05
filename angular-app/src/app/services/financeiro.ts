// src/app/services/financeiro.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface simples para os dados que vêm do backend
export interface Movimentacao {
  _id?: string; // Opcional ao criar, mas presente ao ler
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  data: Date;
}

export interface SaldoResponse {
  saldo: number;
}

// URL base da sua API. O proxy.conf.json irá rotear isso para localhost:3000
const API_URL = '/api/movimentacoes'; 

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  constructor(private http: HttpClient) { }

  // 1. OBTÉM TODAS AS MOVIMENTAÇÕES
  getMovimentacoes(): Observable<any> {
    return this.http.get<any>(API_URL);
  }

  // 2. CALCULA O SALDO TOTAL
  getSaldo(): Observable<SaldoResponse> {
    return this.http.get<SaldoResponse>(`${API_URL}/saldo`);
  }

  // 3. ADICIONA NOVA MOVIMENTAÇÃO (POST)
  addMovimentacao(movimentacao: Omit<Movimentacao, '_id'>): Observable<any> {
    return this.http.post<any>(API_URL, movimentacao);
  }

  // 4. DELETA UMA MOVIMENTAÇÃO POR ID
  deleteMovimentacao(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/${id}`);
  }
}