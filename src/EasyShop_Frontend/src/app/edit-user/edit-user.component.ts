import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { EditUserService } from '../services/edit-user.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit, OnDestroy {
  visible = false;
  user: User = new User(); // Initialize with a new User object
  private visibilitySubscription: Subscription | undefined;
  roles = Object.values(Role).filter((value) => typeof value === 'string');
  @Input() title: string = '';

  constructor(
    private editUserService: EditUserService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.visibilitySubscription = this.editUserService.visibility$.subscribe(
      (isVisible) => {
        this.visible = isVisible;
        if (this.visible) {
          this.user = this.editUserService.user || new User(); // Ensure user is not null
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.visibilitySubscription?.unsubscribe();
  }

  close(): void {
    this.editUserService.close();
  }

  open(): void {
    this.editUserService.open();
  }

  editOrAddUser(): void {
    if (this.editUserService.isAddingUser) {
      this.addUser();
    } else {
      this.editUser();
    }
  }

  editUser(): void {

    if (this.user) {
      this.user.role =  Role.USER;
      this.editUserService.editUser(this.user).subscribe({
        next: (response) => {
          this.notification.create(
            'success',
            'Successful',
            `${response.email} is successfully edited!`
          );
          this.close();
        },
        error: (err) => {
          this.notification.create('error', 'Error!', `Error in editing!`);
        },
      });
    }
  }

  addUser(): void {
    if (this.user) {
      
      this.editUserService.addUser(this.user).subscribe({
        next: (response) => {
          this.notification.create(
            'success',
            'Successful',
            `${response.email} is successfully added!`
          );
          this.close();
        },
        error: (err) => {
          this.notification.create('error', 'Error!', `Error in adding!`);
        },
      });
    }
  }

  openAddUser(): void {
    this.title = 'Create';
    this.editUserService.isAddingUser = true;
    this.editUserService.setUser(new User());
    this.user = this.editUserService.user || new User();
    this.open();
  }
}
