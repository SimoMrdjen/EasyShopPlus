import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Customer } from '../models/customer.model';
import { EditCustomerService } from '../services/edit-customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})



export class EditCustomerComponent implements OnInit, OnDestroy {
  visible = false;
  customer: Customer | null = null;
  private visibilitySubscription: Subscription | undefined;
  //roles = Object.keys(Role).filter((k) => typeof Role[k as any] === 'number');
  @Input() title: string = '';

  constructor(
    private editCustomerService: EditCustomerService,
    private userService: UserService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    console.log('on init in EditUserComponent');
    this.visibilitySubscription = this.editCustomerService.visibility$.subscribe(
      (isVisible) => {
        this.visible = isVisible;
        if (this.visible) {
          this.customer = this.editCustomerService.customer;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.visibilitySubscription?.unsubscribe();
  }

  close(): void {
    this.editCustomerService.close();
  }

  open(): void {
    this.editCustomerService.open();
  }

  editOrAddCustomer() {
    if (this.editCustomerService.isAddingCustomer) {
      this.addCustomer();
    } else {
      this.editCustomer();
      this.editCustomerService.isAddingCustomer = true;
    }
  }

  editCustomer() {
    if (this.customer) {
      this.editCustomerService.editCustomer(this.customer).subscribe({
        next: (response) => {
          console.log(response);
          this.notification.create(
            'success',
            'Succesfull',
            `${response.company} is succesfuly edited!`
          );
        },
        error: (err) => {
          this.notification.create('error', 'Error!', `Error in editing!`);
        },
      });
    }
    this.close();
    this.editCustomerService.setCustomer(new Customer());
  }

  addCustomer() {
    if (this.customer) {
      this.editCustomerService.addCustomer(this.customer).subscribe({
        next: (response) => {
          console.log(response);
          this.notification.create(
            'success',
            'Succesfull',
            `${response.company} is succesfuly added!`
          );
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }
    this.close();
    this.editCustomerService.setCustomer(new Customer());
  }

  openAddCustomer() {
    this.title = 'Create';
    this.editCustomerService.isAddingCustomer = true;
    this.editCustomerService.customer = new Customer();
    this.open();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['title']) {
      //console.log('addingCustomer changed to:', changes['addingCustomer'].currentValue);
    }
  }
}
