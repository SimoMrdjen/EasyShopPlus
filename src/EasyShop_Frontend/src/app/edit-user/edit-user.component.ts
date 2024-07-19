import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EditUserService } from '../services/edit-user.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { Role } from '../models/role.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit, OnDestroy {
  visible = false;
  user: User | null = null;
  private visibilitySubscription: Subscription | undefined;
  roles = Object.keys(Role).filter((k) => typeof Role[k as any] === 'number');
  @Input() title: string = '';

  constructor(
    private editUserService: EditUserService,
    private userService: UserService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    console.log('on init in EditUserComponent');
    this.visibilitySubscription = this.editUserService.visibility$.subscribe(
      (isVisible) => {
        this.visible = isVisible;
        if (this.visible) {
          this.user = this.editUserService.user;
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

  editOrAddUser() {
    if (this.editUserService.isAddingUser) {
      this.addUser();
    } else {
      this.editUser();
      this.editUserService.isAddingUser = true;
    }
  }

  editUser() {
    if (this.user) {
      this.editUserService.editUser(this.user).subscribe({
        next: (response) => {
          console.log(response);
          this.notification.create(
            'success',
            'Succesfull',
            `${response.email} is succesfuly edited!`
          );
        },
        error: (err) => {
          this.notification.create('error', 'Error!', `Error in editing!`);
        },
      });
    }
    this.close();
    this.editUserService.setUser(new User());
  }

  addUser() {
    if (this.user) {
      this.editUserService.addUser(this.user).subscribe({
        next: (response) => {
          console.log(response);
          this.notification.create(
            'success',
            'Succesfull',
            `${response.email} is succesfuly added!`
          );
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }
    this.close();
    this.editUserService.setUser(new User());
  }

  openAddUser() {
    this.title = 'Create';
    this.editUserService.isAddingUser = true;
    this.editUserService.user = new User();
    this.open();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['title']) {
      console.log('addingUser changed to:', changes['addingUser'].currentValue);
    }
  }
}
