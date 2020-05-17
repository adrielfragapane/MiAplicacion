import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthLocalService } from './authLocal.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authLocalService: AuthLocalService) { }

  intercept(req,next) {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log('adsdasdasasd');
    return next.handle(tokenizeReq)
  }
}
