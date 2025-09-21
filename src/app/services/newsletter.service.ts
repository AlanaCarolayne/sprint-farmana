import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsletterItem } from '../interfaces/newsletter'; // <-- caminho da interface

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private apiUrl = 'http://localhost:3000/newsletter'; 
 

  constructor(private http: HttpClient) {}


  list(): Observable<NewsletterItem[]> {
    return this.http.get<NewsletterItem[]>(this.apiUrl);
  }

 
  getById(id: string): Observable<NewsletterItem> {
    return this.http.get<NewsletterItem>(`${this.apiUrl}/${id}`);
  }


  create(item: NewsletterItem): Observable<NewsletterItem> {
    return this.http.post<NewsletterItem>(this.apiUrl, item);
  }

 
  update(id: string, item: NewsletterItem): Observable<NewsletterItem> {
    return this.http.put<NewsletterItem>(`${this.apiUrl}/${id}`, item);
  }


  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
