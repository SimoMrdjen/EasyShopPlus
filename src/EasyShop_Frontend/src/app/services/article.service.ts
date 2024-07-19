import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = BASE_URL + '/article' ;
  public article: Article | null = null;
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  public visibility$ = this.visibilitySubject.asObservable();
  public isAddingArticle: boolean = true;

   

  constructor(private http: HttpClient,  private router: Router) {}


  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url);
  }

  getParams(): HttpParams {
    let params = new HttpParams();
    if (this.article?.id) {
      params = params.append('id', this.article.id);
    }
    return params;
  }

  editArticle(article: Article): Observable<Article> {
    console.log('editUser is running');
    const options = {
      params: this.getParams(),
      responseType: 'json' as 'json',
    };
    return this.http.put<Article>(this.url, article, options);
  }

  addArticle(article: Article): Observable<Article> {
    console.log('editUser is running');
    const options = {
      params: this.getParams(),
      responseType: 'json' as 'json',
    };
    return this.http.post<Article>(this.url, article, options);
  }
  setArticle(article: Article): void {
    this.article = article;
  }

  open(): void {
    this.visibilitySubject.next(true);
  }

  close(): void {
    this.visibilitySubject.next(false);
  }
}
