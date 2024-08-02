import { Component } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';
import { EditCustomerService } from '../services/edit-customer.service';
import { CustomerService } from '../services/customer.service';
import { PurchaseContractService } from '../services/purchase-contract.service';
import { Router } from '@angular/router';
import { InstalmentService } from '../services/instalment.service';

@Component({
  selector: 'app-instalment-customer',
  templateUrl: './instalment-customer.component.html',
  styleUrls: ['./instalment-customer.component.css']
})
export class InstalmentCustomerComponent {
  title: string = '';
  public customers$: Observable<Customer[]>;
  isDrawerVisible = false;
  selectedCustomer: Customer | null = null;
  searchTerm: string = '';



  constructor(
    private editCustomerService: EditCustomerService,
    private customerService: CustomerService,
    private purchaseContractService: PurchaseContractService,
    private router: Router,
        private instalmentService: InstalmentService,



  ) {
      this.customers$ = this.editCustomerService.getCustomers(); // Fetch all initially or leave blank if no search term

    //this.customers$ = this.editCustomerService.getCustomersLike(''); // Fetch all initially or leave blank if no search term
  }

  ngOnInit(): void {}


  newContract(customer: Customer): void {
    this.router.navigate(['/new-contract'], { state: { customer } });
  }

  searchCustomers(): void {
    this.customers$ = this.editCustomerService.getCustomersLike(this.searchTerm);
  }

  getUnpaidedInstalments(customer: Customer): void {
  this.instalmentService.customer = customer;
    this.router.navigate(['/unpaid-instalments'], { state: { customer } });
  }

  getAllInstalments(customer: Customer): void {
    this.instalmentService.customer = customer;

    this.router.navigate(['/all-instalments'], { state: { customer } });
  }
}
