import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriaIdeia } from '../interfaces/cria-ideia';

@Injectable({
  providedIn: 'root',
})
export class CriarIdeiaService {
  private url = 'http://localhost:3000/criaIdeia';

  constructor(private http: HttpClient) {}

  list(): Observable<CriaIdeia[]> {
    return this.http.get<CriaIdeia[]>(this.url);
  }

  add(ideia: CriaIdeia): Observable<CriaIdeia> {
    return this.http.post<CriaIdeia>(this.url, ideia, {
      headers: { 'Content-type': 'application/json' },
    });
  }

  update(ideia: CriaIdeia): Observable<CriaIdeia> {
    return this.http.put<CriaIdeia>(`${this.url}/${ideia.id}`, ideia, {
      headers: { 'Content-type': 'application/json' },
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  updateLikes(id: string, likes: number): Observable<CriaIdeia> {
    return this.http.patch<CriaIdeia>(`${this.url}/${id}`, { likes });
  }
  updateComments(id: string, comments: number): Observable<CriaIdeia> {
    return this.http.patch<CriaIdeia>(`${this.url}/${id}`, { comments });
  }
  updateShares(id: string, share: number): Observable<CriaIdeia> {
    return this.http.patch<CriaIdeia>(`${this.url}/${id}`, { share });
  }
}
