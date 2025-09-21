import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CardService {

   private url = 'http://localhost:3000/card';
  card:Card[] = [];
  constructor(private http:HttpClient) { }

  list(): Observable<Card[]> {
    return this.http.get<Card[]>(this.url) as Observable<Card[]>;
  }

  add(card: Card){
     const httpHeaders = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    return this.http.post(this.url, card, httpHeaders);
  }
  update(card: Card){
    const url = `${this.url}/${card.id}`;
     const httpHeaders = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    return this.http.put(url, card, httpHeaders);
  }
  delete(id: string){
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
