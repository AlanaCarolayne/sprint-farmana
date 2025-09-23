import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TreinamentoCarrossel } from '../interfaces/treinamento'; // ajuste o caminho se necessário

@Injectable({
  providedIn: 'root',
})
export class TreinamentoService {
  private apiUrl = 'http://localhost:3000/treinamentos';

  constructor(private http: HttpClient) {}

  list(): Observable<TreinamentoCarrossel[]> {
    return this.http.get<TreinamentoCarrossel[]>(this.apiUrl);
  }

  getById(id: string): Observable<TreinamentoCarrossel> {
    return this.http.get<TreinamentoCarrossel>(`${this.apiUrl}/${id}`);
  }

  create(item: TreinamentoCarrossel): Observable<TreinamentoCarrossel> {
    return this.http.post<TreinamentoCarrossel>(this.apiUrl, item);
  }

  update(
    id: string,
    item: TreinamentoCarrossel
  ): Observable<TreinamentoCarrossel> {
    return this.http.put<TreinamentoCarrossel>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
