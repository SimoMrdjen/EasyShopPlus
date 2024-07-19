import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { EditUserService } from '../services/edit-user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnInit {
  public users: User[] = [];
  title: string = '';

  constructor(
    private userService: UserService,
    private editUserService: EditUserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.editUserService.getUsers().subscribe({
      next: (response) => {
        console.log(response);
        this.users = <any>response;
        console.log(this.users);
      },
      error: (err) => {
        alert('Error occurred');
      },
    });
  }

  openEditUser(user: User) {
    this.title = 'Edit';
    this.editUserService.isAddingUser = false;
    this.editUserService.setUser(user);
    console.log(user);
    this.editUserService.open();
  }

  getUsersWithoutSecurity() {
    this.editUserService.getUsersWithoutSecurity().subscribe((response) => {
      console.log(response);
      this.users = response;
    });
  }
}
