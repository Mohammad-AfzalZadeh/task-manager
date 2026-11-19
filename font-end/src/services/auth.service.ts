import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../environments/environment.development';
import { LoginRequest, RegisterRequest, TokenRefreshResponse, TokenResponse } from '../app/models/auth.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private _isLoggedIn = signal(
    !!localStorage.getItem('access_token')
  );

  isLoggedIn = computed(() => this._isLoggedIn());

  private apiUrl = environment.apiUrl + 'auth/';

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(
      this.apiUrl + 'register/',
      data
    );
  }

  login(data: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      this.apiUrl + 'token/',
      data
    ).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);


        this._isLoggedIn.set(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');

    this._isLoggedIn.set(false);

  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }


  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  refreshToken(): Observable<TokenRefreshResponse> {
    const refresh = localStorage.getItem('refresh_token');

    return this.http.post<TokenRefreshResponse>(
      this.apiUrl + 'token/refresh/',
      { refresh }
    ).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access);

        // SimpleJWT may return a new refresh token
        // when token rotation is enabled.
        if (response.refresh) {
          localStorage.setItem('refresh_token', response.refresh);
        }
      })
    );
  }
}



