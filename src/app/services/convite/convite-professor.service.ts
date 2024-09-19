import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../../tokenauth/token.service';
import { Usuario } from '../../typings/models';

@Injectable({
  providedIn: 'root'
})
export class ConviteProfessorService {

  private user: Usuario = {};
  private readonly API = 'http://localhost:5000/convite';

  constructor(private http: HttpClient, private tokenService: TokenService) {
    
  }

  cadastrarConvite(convite: any): Observable<any> {
    return this.http.post<any>(this.API, {
      convite: convite
    }); // salva usuario
  }

  replayConvite(convite:any,mode:string): Observable<any>{
    return this.http.put<any>(this.API,{
      convite: convite,
      mode:mode
    })
  }

  



  
}
