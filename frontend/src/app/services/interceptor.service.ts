import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor  {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //intercept(res, next) {

    return next.handle(req).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401) {
            console.log('SIN PERMISO');
            this.handleAuthError();
            return of(err);
          }
        }
      )
    );
  }

  private handleAuthError() {
    localStorage.removeItem('token');
  }
}

 /*next.handle:  */
