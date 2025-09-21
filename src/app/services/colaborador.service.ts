import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Colaborador } from '../interfaces/colaborador';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColaboradorService {
  private url = 'http://localhost:3000/colaboradores'; 

  constructor(private http: HttpClient) {}

  list(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.url);
  }

  add(colaborador: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(this.url, colaborador, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  update(colaborador: Colaborador): Observable<Colaborador> {
    return this.http.put<Colaborador>(
      `${this.url}/${colaborador.id}`,
      colaborador,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

   getById(id: string): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${this.url}/${id}`);
  }

}
