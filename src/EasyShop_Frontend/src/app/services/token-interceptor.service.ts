import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private tokenService: TokenService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/authenticate')) {
      return next.handle(request);
    }

    const token = localStorage.getItem('token');
    if (!token || this.tokenService.isTokenExpired(token)) {
      this.router.navigate(['/login']);
      return new Observable<HttpEvent<any>>();
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(request);
  }
}
