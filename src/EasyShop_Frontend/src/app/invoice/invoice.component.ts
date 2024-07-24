import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Customer } from '../models/customer.model';
import { InvoiceService } from '../services/invoice.service';
import { CustomerService } from '../services/customer.service';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  customers$: Observable<Customer[]> = of([]);
  filteredCustomers$: Observable<Customer[]> = of([]);
  localCustomers: Customer[] = [];
  customer: Customer = new Customer();
  discount: number = 0;
  products: Article[] = [];
  selectedCustomerId: number = 0;


  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private invoiceService: InvoiceService, 
    private articleService: ArticleService,
    private router: Router
  ) {
    this.invoiceForm = this.fb.group({
      customer: ['', Validators.required],
      discount: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.setupForm();
  }

  loadCustomers() {
    console.error('Start loadCustomers()');
    this.customers$ = this.customerService.getCustomers().pipe(
      catchError(err => {
        console.error('Failed to fetch customers', err);
        return of([]);
      })
    );
    this.customers$.subscribe(customers => {
      this.localCustomers = customers;
    });
  }

  setupForm() {
    console.error('Enter in setupForm())');
    const customerControl = this.invoiceForm.get('customer');
    if (customerControl) {
      this.filteredCustomers$ = customerControl.valueChanges.pipe(
        startWith(''),
        switchMap((value: string) => this.filterCustomers(value)),
        catchError(err => {
          console.error('Error handling customer search', err);
          return of([]);
        })
      );

      customerControl.valueChanges.subscribe(id => {
        console.error('Enter in customerControl.valueChanges.subscribe() and id = ' + id);
        const customer = this.getCustomerById(id);
        if (customer) {
          this.customer = customer;
          console.log('Customer fetched successfully:', customer);
          this.selectedCustomerId = id;
          this.invoiceService.invoice.customer = customer;
        } else {
          console.error('No customer found with id:', id);
        }
      });
    } else {
      console.error('Customer form control does not exist.');
    }
  }

  getCustomerById(customerId: number): Customer | undefined {
    return this.localCustomers.find(customer => customer.id === customerId);
  }

  filterCustomers(value: string): Observable<Customer[]> {
    const searchString = String(value).toLowerCase();
    return this.customers$.pipe(
      map(customers => customers.filter(customer =>
        customer.lastName && customer.lastName.toLowerCase().includes(searchString)
      ))
    );
  }
  

  onSubmit(): void {
    //const selectedCustomerId = this.invoiceForm.get('customer')!.value;
    const selectedCustomer = this.getCustomerById(this.selectedCustomerId);

    if (selectedCustomer) {
      this.invoiceService.invoice.customer = selectedCustomer;
      this.invoiceService.invoice.discount = this.invoiceForm.get('discount')!.value;
      this.invoiceService.invoice.date = new Date();
      this.invoiceService.products$ = this.articleService.getArticles();

      this.router.navigate(['/entry']).then(() => {
        console.log("Navigation to entry page completed");
      });

      this.invoiceForm.reset();
    } else {
      console.error('No customer found for the selected ID');
    }
  }

  searchProducts(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCustomers$ = this.filterCustomers(value);
  }
  searchCustomers(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.invoiceForm.get('customer')!.setValue(value);
  }
  findCustomerById(customerId: string): Customer {
    const customer = this.localCustomers.find(cust => cust.id === parseInt(customerId));
    return customer ? customer : new Customer();
  }
}
