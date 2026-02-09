import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TenantService } from './tenant.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private tenantService: TenantService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.authService.currentUserValue;
    const tenantId = this.tenantService.getCurrentTenant();

    // Clone the request to add the new headers
    let clonedRequest = request.clone({
      setHeaders: {
        'X-Tenant-ID': tenantId
      }
    });

    // Add the Authorization header only if a token exists
    if (currentUser && currentUser.token) {
      clonedRequest = clonedRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
