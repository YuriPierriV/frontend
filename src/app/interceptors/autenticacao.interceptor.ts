import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../tokenauth/token.service';

export const autenticacaoInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  
  if(tokenService.possuiToken()){
    
    const token = tokenService.token();
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log(clonedRequest)
    return next(clonedRequest);
  }
  
  return next(req);
};
