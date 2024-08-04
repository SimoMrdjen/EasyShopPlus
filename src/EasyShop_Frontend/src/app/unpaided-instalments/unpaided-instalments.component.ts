import { Component } from '@angular/core';
import { Instalment } from '../models/instalment.model';
import { Observable } from 'rxjs';
import { PurchaseContractService } from '../services/purchase-contract.service';
import { Router } from '@angular/router';
import { InstalmentService } from '../services/instalment.service';

@Component({
  selector: 'app-unpaided-instalments',
  templateUrl: './unpaided-instalments.component.html',
  styleUrls: ['./unpaided-instalments.component.css'],
})
export class UnpaidedInstalmentsComponent {
  title: string = '';
  public instalments$!: Observable<Instalment[]>;
  isDrawerVisible = false;

  constructor(
    private purchaseContractService: PurchaseContractService,
    private router: Router,
    private instalmentService: InstalmentService
  ) {
    this.instalments$ = this.instalmentService.getInstalmentsByCustomerUnpaid(
      instalmentService.customer.id
    ); // Fetch all initially or leave blank if no search term
  }

  editInstalment(instalment: Instalment): void {
    this.isDrawerVisible = true;
    //this.router.navigate(['/edit-instalment'], { state: { instalment } });
  }
}
