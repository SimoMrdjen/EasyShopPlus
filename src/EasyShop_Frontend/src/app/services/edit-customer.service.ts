import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { Customer } from '../models/customer.model';

/*
@Injectable({
  providedIn: 'root'
})
export class EditCustomerService {

  private readonly url = BASE_URL + '/customer';
  public customer: Customer | null = null;
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  public visibility$ = this.visibilitySubject.asObservable();
  public isAddingCustomer: boolean = true;

  constructor(private http: HttpClient,
    private router: Router) {}

  setCustomer(customer: Customer): void {
    this.customer = customer;
  }

  getCustomer(): Customer | null {
    return this.customer;
  }

  editCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.url}/${customer.id}`, customer);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.url, customer);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }

  getCustomersPaginated(pageIndex: number = 1, pageSize: number = 10): Observable<Customer[]> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Customer[]>(this.url, { params });
  }

  open(): void {
    this.visibilitySubject.next(true);
  }

  close(): void {
    this.visibilitySubject.next(false);
  }
}

*/




@Injectable({
  providedIn: 'root'
})
export class EditCustomerService implements OnInit {

  private readonly url = BASE_URL + '/customer';
  public customer: Customer | null = null;
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  public visibility$ = this.visibilitySubject.asObservable();
  public isAddingCustomer: boolean = true;

  constructor(private http: HttpClient,
              private router: Router) {
    console.log('constructor() is running in service');
  }

  ngOnInit(): void {
    console.log('ngOnIit() is running in service');
  }

  getParams(): HttpParams {
    let params = new HttpParams();
    if (this.customer?.id) {
      params = params.append('id', this.customer.id);
    }
    return params;
  }

  editCustomer(customer: Customer): Observable<Customer> {
    console.log('editUser is running');
    const options = {
      params: this.getParams(),
      responseType: 'json' as 'json',
    };
    return this.http.put<Customer>(this.url, customer, options);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    console.log('editUser is running');
    const options = {
      params: this.getParams(),
      responseType: 'json' as 'json',
    };
    return this.http.post<Customer>(this.url, customer, options);
  }

  getCustomers(): Observable<Customer[]> {
    console.log('getCustomer in editCustomer service is called');
// here is problem
    return this.http.get<Customer[]>(this.url);
  }

  getCustomersWithoutSecurity(
    pageIndex: number = 1,
    pageSize: number = 10
  ): Observable<Customer[]> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Customer[]>(this.url);
  }

  //methods for Drawer

  setCustomer(customer: Customer): void {
    this.customer = customer;
  }

  open(): void {
    this.visibilitySubject.next(true);
  }

  close(): void {
    this.visibilitySubject.next(false);
  }
}

