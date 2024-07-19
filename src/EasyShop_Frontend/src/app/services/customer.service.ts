import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { customersData } from '../database/customers';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  getCustomerById(customerId: number): Customer {
    throw new Error('Method not implemented.');
  }
 // private customers = customersData;
   private url = BASE_URL + '/customer' ;
   public customer: Customer | null = null;
   private visibilitySubject = new BehaviorSubject<boolean>(false);
   public visibility$ = this.visibilitySubject.asObservable();
  // public isAddingArticle: boolean = true;
   public isAddingCustomer: boolean = true;
 
   

  constructor(
    private http: HttpClient,  
    private router: Router) { 
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }

  getParams(): HttpParams {
    let params = new HttpParams();
    if (this.customer?.id) {
      params = params.append('id', this.customer.id);
    }
    return params;
  }

  editArticle(customer: Customer): Observable<Customer> {
    console.log('editUser is running');
    const options = {
      params: this.getParams(),
      responseType: 'json' as 'json',
    };
    return this.http.put<Customer>(this.url, customer, options);
  }

  addArticle(customer: Customer): Observable<Customer> {
    console.log('editUser is running');
    const options = {
      params: this.getParams(),
      responseType: 'json' as 'json',
    };
    return this.http.post<Customer>(this.url, customer, options);
  }
  setArticle(customer: Customer): void {
    this.customer = customer;
  }
  open(): void {
    this.visibilitySubject.next(true);
  }

  close(): void {
    this.visibilitySubject.next(false);
  }
 
}
