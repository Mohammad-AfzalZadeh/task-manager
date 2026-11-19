import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, catchError, finalize, shareReplay, switchMap, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { environment } from '../environments/environment.development';

// Shared refresh request: multiple failed requests
// should not create multiple refresh requests.
let refreshInProgress: Observable<any> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getAccessToken();

    const isBackendRequest = req.url.startsWith(environment.apiUrl);
    const isAuthRequest = req.url.startsWith(environment.apiUrl + 'auth/');

    // Do not attach tokens to unrelated requests.
    if (!isBackendRequest || isAuthRequest || !token) {
        return next(req);
    }

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {

            // Only attempt refresh for unauthorized requests.
            if (error.status !== 401) {
                return throwError(() => error);
            }

            const refreshToken = localStorage.getItem('refresh_token');

            if (!refreshToken) {
                authService.logout();
                router.navigate(['/login']);

                return throwError(() => error);
            }

            // Start a refresh request only if one isn't already running.
            if (!refreshInProgress) {
                refreshInProgress = authService.refreshToken().pipe(
                    finalize(() => {
                        refreshInProgress = null;
                    }),
                    shareReplay(1)
                );
            }

            return refreshInProgress.pipe(
                switchMap(response => {

                    // Retry the original request with the new token.
                    const retryRequest = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${response.access}`
                        }
                    });

                    return next(retryRequest);
                }),

                catchError(refreshError => {
                    authService.logout();
                    router.navigate(['/login']);

                    return throwError(() => refreshError);
                })
            );
        })
    );
};