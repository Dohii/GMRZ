import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErorrInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401) {
            return throwError(error.statusText);
          }
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            console.error(applicationError);
            return throwError(applicationError);
          }
          const serverError = error.error.errors;
          let modelStateErrors = '';
          if (serverError && typeof serverError === 'object') {
            for (const key in serverError) {
              if (serverError[key]) {
                modelStateErrors += serverError[key] + '\n';
              }
            }
          }
          return throwError(modelStateErrors || serverError || 'Server Error');
        }
      })
    );
  }
}

export const ErorrInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErorrInterceptor,
  multi: true,
};


//Error interceptor koristimo da preuzmemo greske i izlistamo na najlaksi nacin prema angularu
// u slucaju da se pojavi nova greska ili je namjerno stavimo u apiu dovoljno je dodati kao if i naveste status kod greske
