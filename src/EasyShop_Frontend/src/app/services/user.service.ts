import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users: User[] = [];

  constructor() {
    this.users.push(new User(1, 'simo', Role.USER));
    this.users.push(new User(2, 'maki', Role.ADMIN));
  }
}
