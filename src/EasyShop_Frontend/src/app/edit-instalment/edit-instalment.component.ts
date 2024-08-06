// src/app/edit-instalment/edit-instalment.component.ts
import { Component, Input } from '@angular/core';
import { Instalment } from '../models/instalment.model';
import { Subscription } from 'rxjs';
import { InstalmentService } from '../services/instalment.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-instalment',
  templateUrl: './edit-instalment.component.html',
  styleUrls: ['./edit-instalment.component.css'],
})
export class EditInstalmentComponent {
  @Input() visible: boolean = false;
  instalment: Instalment | null = null;
  private visibilitySubscription: Subscription | undefined;
  @Input() title: string = '';

  constructor(
    private instalmentService: InstalmentService,
    private notification: NzNotificationService,
    private decimalPipe: DecimalPipe,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.log('on init in EditUserComponent');
    this.visibilitySubscription = this.instalmentService.visibility$.subscribe(
      (isVisible) => {
        this.visible = isVisible;
        if (this.visible) {
          this.instalment = this.instalmentService.instalment || null;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.visibilitySubscription?.unsubscribe();
  }

  close(): void {
    this.instalmentService.close();
  }

  open(): void {
    this.instalmentService.open();
  }

  editInstalment() {
    if (this.instalment) {
      this.instalmentService.editInstalment(this.instalment).subscribe({
        next: (response) => {
          console.log(response);
          this.notification.create(
            'success',
            'Uspesno!',
            `Uplata od ${response.installmentAmount} din. je snimljena!`
          );
          this.router.navigate(['/payment-confirmation'], { state: { instalment: response } });
        },
        error: (err) => {
          this.notification.create('error', 'Error!', `Error in editing!`);
        },
      });
    }
    this.close();
    this.instalmentService.setInstalment(new Instalment());
  }

  updatePurchaseContractId(value: any) {
    if (this.instalment && this.instalment.purchaseContractDto) {
      this.instalment.purchaseContractDto.id = value;
    }
  }

  updateInstallmentAmount(value: string): void {
    if (this.instalment) {
      this.instalment.installmentAmount = parseFloat(value.replace(/,/g, ''));
    }
  }

  get formattedInstallmentAmount(): string {
    return this.decimalPipe.transform(this.instalment?.installmentAmount, '1.2-2') || '';
  }

  updateInstallmentOrdinal(value: any) {
    if (this.instalment) {
      this.instalment.installmentOrdinal = value;
    }
  }

  updateMaturityDate(value: any) {
    if (this.instalment) {
      this.instalment.maturityDate = value;
    }
  }

  updatePaidAmount(value: any) {
    if (this.instalment) {
      this.instalment.paidAmount = parseFloat(value.replace(/,/g, ''));
    }
  }

  get formattedPaidAmount(): string {
    return this.decimalPipe.transform(this.instalment?.paidAmount, '1.2-2') || '';
  }

  updatePaymentMethod(value: any) {
    if (this.instalment) {
      this.instalment.paymentMethod = value;
    }
  }
}
