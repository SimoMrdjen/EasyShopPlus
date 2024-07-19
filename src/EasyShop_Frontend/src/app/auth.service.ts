import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}


  isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); // get token from local storage

    if (!token) {
      console.log('line 15 authService');
      return true; // false;
    }

    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object

   // return parsedPayload.exp > Date.now() / 1000; // check if token is expired
   console.log('line 22 authService');

   return true;
  }
  
}
