import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { Customer } from '../models/customer.model';
import { Invoice } from '../models/invoice.model';
import { ArticleService } from './article.service';
import { BASE_URL } from '../constants';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private productsSubject = new BehaviorSubject<Article[]>([]);
  public products$ = this.productsSubject.asObservable();
  public invoice: Invoice = new Invoice();
  private url = BASE_URL + '/invoice' ;


  constructor(
    private articleService: ArticleService,
    private http: HttpClient
  ) {
    console.log("Invoice service created");
    console.log(this.products$);
  }

  getParams(): HttpParams {
    let params = new HttpParams();
    if (this.invoice?.id) {
      params = params.append('id', this.invoice.id);
    }
    return params;
  }

  saveInvoice(invoice: Invoice): Observable<Invoice> {
    const options = {
      params: this.getParams(),
      responseType: 'json' as 'json',
    };
    return this.http.post<Invoice>(this.url, invoice, options);
  }
  
  private loadProducts() {
  
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.productsSubject.next(articles);
      },
      error: (err) => {
        console.error('Failed to fetch articles', err);
        this.productsSubject.next([]);
      }
    });
  }

  resetInvoice() {
    // Resets the invoice to initial state
    this.invoice = new Invoice();
  }


}
