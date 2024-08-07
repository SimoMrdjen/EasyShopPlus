import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { EditCustomerService } from '../services/edit-customer.service';
import { CustomerService } from '../services/customer.service';
import { PurchaseContractService } from '../services/purchase-contract.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  //public customers: Customer[] = [];
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

    
  ) {
      this.customers$ = this.editCustomerService.getCustomers(); // Fetch all initially or leave blank if no search term

    //this.customers$ = this.editCustomerService.getCustomersLike(''); // Fetch all initially or leave blank if no search term
  }

  ngOnInit(): void {}

  openEditCustomer(customer: Customer): void {
    this.title = 'Proveri podatke o kupcu';
    this.editCustomerService.isAddingCustomer = false;
    this.editCustomerService.setCustomer(customer);
    this.editCustomerService.open();
  }

  openNewContract(customer: Customer): void {
    this.selectedCustomer = customer;
    this.isDrawerVisible = true;
    this.title = 'Novi Ugovor';
    this.purchaseContractService.setCustomer(customer);
    this.purchaseContractService.open();
  }
  
  newContract(customer: Customer): void {
    this.router.navigate(['/new-contract'], { state: { customer } });
  }

  searchCustomers(): void {
    this.customers$ = this.editCustomerService.getCustomersLike(this.searchTerm);
  }
}
