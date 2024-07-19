import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { EditCustomerService } from '../services/edit-customer.service';
import { CustomerService } from '../services/customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css'],
})
export class CustomerTableComponent implements OnInit {
  public customers: Customer[] = [];
  title: string = '';
  customers$: Observable<Customer[]>;

  constructor(
    private editCustomerService: EditCustomerService,
    private customerService: CustomerService
  ) {
    this.customers$ = this.customerService.getCustomers();
  }

  ngOnInit(): void {
   this.getCustomers();
  }

  getCustomers(): void {
    this.editCustomerService.getCustomers().subscribe({
      next: (response) => {
        console.log(response);
        this.customers = <any>response;
        console.log(this.customers);
      },
      error: (err) => {
        alert('Error occurred');
      },
    });
  }

  openEditCustomer(customer: Customer): void {
    this.title = 'Edit';
    this.editCustomerService.isAddingCustomer = false;
    this.editCustomerService.setCustomer(customer);
    this.editCustomerService.open();
  }
}
