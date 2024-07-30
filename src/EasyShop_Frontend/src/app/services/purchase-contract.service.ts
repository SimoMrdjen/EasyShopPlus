import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { PurchaseContract } from '../models/contract.model';
import { BASE_URL } from '../constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PurchaseContractService {

  private url = BASE_URL + '/contracts' ;
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  visibility$: Observable<boolean> = this.visibilitySubject.asObservable();
  private customerSubject = new BehaviorSubject<Customer | null>(null);
  customer$: Observable<Customer | null> = this.customerSubject.asObservable();
  purchaseContract: PurchaseContract = new PurchaseContract();

  constructor(private http: HttpClient,
    private router: Router) {}

 getParams(): HttpParams {
    let params = new HttpParams();
    if (this.purchaseContract?.id) {
      params = params.append('id', this.purchaseContract.id);
    }
    return params;
  }

    addContract(purchaseContract: PurchaseContract): Observable<PurchaseContract> {
      console.log('editUser is running');
      const options = {
        params: this.getParams(),
        responseType: 'json' as 'json',
      };
      return this.http.post<PurchaseContract>(this.url, purchaseContract, options);
    }

  open() {
    this.visibilitySubject.next(true);
  }

  close() {
    this.visibilitySubject.next(false);
  }

  setCustomer(customer: Customer) {
    this.customerSubject.next(customer);
  }
}
