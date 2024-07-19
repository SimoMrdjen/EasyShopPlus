import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  isTokenExpired(token: string): boolean {
    const tokenData = this.parseToken(token);
    if (!tokenData) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return tokenData.exp < currentTime;
  }

  private parseToken(token: string): { exp: number } | null {
    try {
      const tokenPayload = token.split('.')[1];
      const decodedPayload = atob(tokenPayload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      return null;
    }
  }
}
