import { Injectable } from '@angular/core';
import { Usuario } from '../../typings/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../../tokenauth/token.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private user: Usuario = {};
  private readonly API = 'http://localhost:5000/curso';

  constructor(private http: HttpClient, private tokenService: TokenService) {
    
  }

  cadastrarCurso(curso: any): Observable<any> {
    return this.http.post<any>(this.API, {
      curso: curso
    }); // salva usuario
  }



  editarCurso(curso : any):Observable<any>{
    return this.http.put<any>(this.API,{
      curso: curso
    })
  }


}
