import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class EditUserService implements OnInit {
  private readonly url = BASE_URL + '/users';
  public user: User | null = null;
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  public visibility$ = this.visibilitySubject.asObservable();
  public isAddingUser: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ngOnIit() is running in service');
  }

  editUser(user: User): Observable<User> {
    console.log('editUser is running');
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  addUser(user: User): Observable<User> {
    console.log('addUser is running');
    return this.http.post<User>(this.url, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUsersWithoutSecurity(pageIndex: number = 1, pageSize: number = 10): Observable<User[]> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<User[]>(this.url, { params });
  }

  // Methods for Drawer
  setUser(user: User): void {
    this.user = user;
  }

  open(): void {
    this.visibilitySubject.next(true);
  }

  close(): void {
    this.visibilitySubject.next(false);
  }
}
