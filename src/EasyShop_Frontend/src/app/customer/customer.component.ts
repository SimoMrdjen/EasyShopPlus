import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { User } from '../models/user.model';
import { CustomerService } from '../services/customer.service';
import { EditCustomerService } from '../services/edit-customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  public customers: Customer[] = [];
  title: string = 'Aaaaa';
  customers$: Observable<Customer[]>;


  constructor(
    //private userService: EditCustomerService,
    private editCustomerService: EditCustomerService,
    private http: HttpClient,
    private customerService: CustomerService,

  ) {
    this.customers$ = this.customerService.getCustomers();

  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
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

  openEditCustomer(customer: Customer) {
    this.title = 'Edit';
    this.editCustomerService.isAddingCustomer = false;
    this.editCustomerService.setCustomer(customer);
    //console.log(user);
    this.editCustomerService.open();
  }

  /*
  getUsersWithoutSecurity() {
    this.editCustomerService.getUsersWithoutSecurity().subscribe((response) => {
      console.log(response);
      this.customers = response;
    });
    ////////////////
    */
  }


