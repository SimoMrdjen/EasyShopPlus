import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Customer } from '../models/customer.model';
import { PurchaseContractService } from '../services/purchase-contract.service';

@Component({
  selector: 'app-contract-drawer',
  templateUrl: './contract-drawer.component.html',
  styleUrls: ['./contract-drawer.component.css']
})
export class ContractDrawerComponent implements OnInit, OnChanges, OnDestroy {

  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Input() customer: Customer | null = null;

  contractForm: FormGroup;
  private visibilitySubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private purchaseContractService: PurchaseContractService
  ) {
    const currentDate = new Date();
    const nextInstalmentDate = new Date();
    nextInstalmentDate.setDate(currentDate.getDate() + 30);
    this.contractForm = this.fb.group({
      contractAmount: [null, Validators.required],
      participation: [null, Validators.required],
      contractDate: [currentDate, Validators.required],  // Set default value to current date
      nextInstalmentDate: [nextInstalmentDate, Validators.required]
    });
  }

  ngOnInit(): void {
    this.visibilitySubscription = this.purchaseContractService.visibility$.subscribe(
      (isVisible) => {
        this.visible = isVisible;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer'] && changes['customer'].currentValue) {
      this.customer = changes['customer'].currentValue;
    }

    if (changes['visible'] && changes['visible'].currentValue) {
      this.visible = changes['visible'].currentValue;
    }
  }
  ngOnDestroy(): void {
    this.visibilitySubscription?.unsubscribe();
  }

  close(): void {
    this.purchaseContractService.close();
  }

  newContract(): void {
    if (this.contractForm.valid && this.customer) {
      const contractData = this.contractForm.value;
      contractData.customer = this.customer;
      //this.purchaseContractService.newContract(contractData);
      this.close();
    }
  }
  formatParticipation(): void {
    const value = this.contractForm.get('participation')?.value;
    if (value != null) {
      this.contractForm.get('participation')?.setValue(
        Number(value).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      );
    }
  }
}
