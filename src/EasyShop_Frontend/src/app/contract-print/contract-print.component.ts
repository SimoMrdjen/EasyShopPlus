import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseContract } from '../models/contract.model';

@Component({
  selector: 'app-contract-print',
  templateUrl: './contract-print.component.html',
  styleUrls: ['./contract-print.component.css']
})
export class ContractPrintComponent implements OnInit {
  public contract?: PurchaseContract;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.contract = navigation.extras.state['contract'];
    }
  }

  ngOnInit(): void {}
}

