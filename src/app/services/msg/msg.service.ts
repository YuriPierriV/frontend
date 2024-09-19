import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../../tokenauth/token.service';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  private readonly API = 'http://localhost:5000/msg';

  constructor(private http: HttpClient, private tokenService: TokenService) {
    
  }

  atualizarMsgStatus(msg:any,status:string): Observable<any>{
    return this.http.put<any>(`${this.API}/status`,{
      msg: msg,
      status:status
    })
  }

}
