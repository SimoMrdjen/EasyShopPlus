import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseContractService } from '../services/purchase-contract.service';
import { Customer } from '../models/customer.model';
import { PurchaseContract } from '../models/contract.model';
import { DecimalPipe } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.css'],
  providers: [DecimalPipe]
})
export class NewContractComponent implements OnInit {
  contractForm!: FormGroup;
  public customer?: Customer;

  constructor(
    private purchaseContractService: PurchaseContractService,
    private router: Router,
    private fb: FormBuilder,
    private decimalPipe: DecimalPipe,
    private notification: NzNotificationService

  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.customer = navigation.extras.state['customer'];
    }
  }

  ngOnInit(): void {
    this.contractForm = this.fb.group({
      contractAmount: [null, [Validators.required, Validators.min(0)]],
      participation: [null, [Validators.required, Validators.min(0)]],
      contractDate: [new Date(), Validators.required],
      nextInstalmentDate: [new Date(new Date().setDate(new Date().getDate() + 30)), Validators.required]
    });
  }

  formatParticipation(): void {
    let participationValue = this.contractForm.get('participation')?.value;
    if (participationValue !== null && participationValue !== undefined) {
      participationValue = this.decimalPipe.transform(participationValue, '1.2-2');
      this.contractForm.get('participation')?.setValue(participationValue, { emitEvent: false });
    }
  }

  formatAmount(): void {
    let participationValue = this.contractForm.get('contractAmount')?.value;
    if (participationValue !== null && participationValue !== undefined) {
      participationValue = this.decimalPipe.transform(participationValue, '1.2-2');
      this.contractForm.get('contractAmount')?.setValue(participationValue, { emitEvent: false });
    }
  }
  
  validateNumberInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/[0-9.]/.test(inputChar)) {
      event.preventDefault();
    }
  }

  submitContract(): void {
    if (this.contractForm.valid && this.customer) {
      const newContract: PurchaseContract = {
        ...this.contractForm.value,
        customer: this.customer
      };
      this.purchaseContractService.addContract(newContract).subscribe({
        next: (response) => {
          console.log(response);
          this.notification.create(
            'success',
            'Succesfull',
            `${response.id} is succesfuly added!`
          );
          this.router.navigate(['/contract-print'], { state: { contract: response } });

        },
        error: (err) => {
          this.notification.create(
            'error',
            'Ugovor nije snimljen!',
            `${err.message}`
          );
        },
      });
    }
 
  }
}
