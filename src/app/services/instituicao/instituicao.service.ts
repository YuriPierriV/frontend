import { Injectable } from '@angular/core';
import { Instituicao, Usuario } from '../../typings/models';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../tokenauth/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {
  private user: Usuario = {};
  private readonly API = 'http://localhost:5000/instituicao';

  constructor(private http: HttpClient, private tokenService: TokenService) {
    
  }


  salvarInstituicao(instituicao: Instituicao): Observable<any> {
    return this.http.post<any>(this.API, {
      instituicao: instituicao
    }); // salva usuario
  }

  salvarUnidade(unidade : any):Observable<any>{
    return this.http.post<any>(`${this.API}/unidade`,{
      unidade: unidade
    })
  }

  editarUnidade(unidade : any):Observable<any>{
    return this.http.put<any>(`${this.API}/unidade`,{
      unidade: unidade
    })
  }
}
