import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
          // Client-side errors (e.g., network issues)
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Server-side errors
          switch (error.status) {
            case 401: // Unauthorized
              errorMessage = 'Your session has expired. Please log in again.';
              this.authService.logout();
              break;
            case 403: // Forbidden
              errorMessage = 'You do not have permission to perform this action.';
              break;
            case 404: // Not Found
              errorMessage = 'The requested resource could not be found.';
              break;
            case 500: // Internal Server Error
              errorMessage = 'A server error occurred. Please try again later.';
              break;
            default:
              errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
          }
        }

        // For now, we'll use a simple alert. In a real app, you'd use a toast/snackbar service.
        alert(errorMessage);
        console.error(errorMessage, error);

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
