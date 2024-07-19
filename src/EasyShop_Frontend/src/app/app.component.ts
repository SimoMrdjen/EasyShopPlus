import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/role.model';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  indirektni?: string|null;
  private indirektniSubscription?: Subscription;
  title = 'Kiss Miss';
  role?: Role;
  Role = Role;
  kvartal: number | undefined;
  private kvartalSubscription?: Subscription;



  constructor(
    private router: Router,

    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
  
    const roleStr = localStorage.getItem('role');
    if (roleStr) {
      this.role = Role[roleStr as keyof typeof Role];
    }
  
  }

  ngOnDestroy(): void {
  }

  onLogout(): void {
    localStorage.clear(); // Clear all local storage
    this.router.navigate(['/login']).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
     
    });
  }
}

