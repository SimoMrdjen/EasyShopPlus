import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { Instalment } from '../models/instalment.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InstalmentService {

  private url = BASE_URL + '/instalment' ;
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  visibility$: Observable<boolean> = this.visibilitySubject.asObservable();
  private instalmentSubject = new BehaviorSubject<Instalment | null>(null);
  instalments$: Observable<Instalment | null> = this.instalmentSubject.asObservable();
  instalment: Instalment | undefined;
  customer: any;
  //purchaseContract: PurchaseContract = new PurchaseContract();

  constructor(private http: HttpClient,
    private router: Router) {}

    getParams(id: number): HttpParams {
      let params = new HttpParams();
      if (id) {
        params = params.append('customerId', id);
      }
      return params;
    }

    getInstalmentById(customerId: number): Instalment {
      throw new Error('Method not implemented.');
    }

    getInstalments(): Observable<Instalment[]> {
      return this.http.get<Instalment[]>(this.url);
    }

    getInstalmentsByCustomerUnpaid(customerId: number): Observable<Instalment[]> {
          const options = {
            params: this.getParams(customerId || 0),
            responseType: 'json' as 'json',
          };
      return this.http.get<Instalment[]>(`${this.url}/unpaid`, options);
    }

    getInstalmentsByCustomer(customerId: number): Observable<Instalment[]> {
      const options = {
        params: this.getParams(customerId || 0),
        responseType: 'json' as 'json',
      };
      return this.http.get<Instalment[]>(`${this.url}/customer`,options);
    }

    editInstalment(instalment: Instalment): Observable<Instalment> {
      console.log('editUser is running');
      const options = {
        params: this.getParams(instalment.id || 0),
        responseType: 'json' as 'json',
      };
      return this.http.put<Instalment>(this.url, instalment, options);
    }

    setInstalment(instalment: Instalment): void {
      this.instalment = instalment;
    }
    open(): void {
      this.visibilitySubject.next(true);
    }

    close(): void {
      this.visibilitySubject.next(false);
    }

}
