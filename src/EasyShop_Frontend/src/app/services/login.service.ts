import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly url = BASE_URL + '/auth/authenticate';
  user?: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notification: NzNotificationModule
  ) {}

  login(user: User): Observable<any> {
    console.log('Sending login request...');
    return this.http.post<User>(this.url, user);
   
  }
}
