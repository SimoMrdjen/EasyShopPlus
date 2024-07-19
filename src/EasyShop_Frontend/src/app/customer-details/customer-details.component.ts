import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  public customer!: Customer;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   const id: number = Number(params.get('id'));
    //   this.customer = this.customerService.users.filter(
    //     (u) => u.id === id
    //   )[0];
    // });
  }
}
