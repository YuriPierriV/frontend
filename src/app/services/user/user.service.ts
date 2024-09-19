import { Injectable } from '@angular/core';
import { Aluno, Instituicao, Professor, Usuario, UsuarioCompleto } from '../../typings/models';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../tokenauth/token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: Usuario = {};
  private usuario: any;
  private readonly API = 'http://localhost:5000/usuarios';
  private userSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private http: HttpClient, private tokenService: TokenService) {
    if (this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  setUser(user: Usuario): void {
    this.user = user;
    this.userSubject.next(user);
  }

  getUser(): Usuario {
    return this.user;
  }

  inicializarUsuario(resp: UsuarioCompleto): UsuarioCompleto {
    let usuarioCompleto: UsuarioCompleto = resp;
    return usuarioCompleto;
  }

  decodificarJWT() {
    const token = this.tokenService.token();
    if (token) {
      try {
        const user = jwtDecode<Usuario>(token);
        this.setUser(user);
      } catch (error) {
        console.error('Erro ao decodificar o token JWT', error);
      }
    }
  }

  retornarUsuario(): Observable<Usuario | null> {
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  logged(): boolean {
    return this.tokenService.possuiToken();
  }

  getUserData(): Observable<any> {
    return this.http.get<Usuario>(this.API);
  }

  salvarUsuario(user: Usuario, method: string): Observable<any> {
    return this.http.post<any>(this.API, {
      method: method,
      user: user
    });
  }

  editarCadastro(user: Usuario): Observable<any> {
    const url = `${this.API}/${user.id}`;
    return this.http.put<any>(url, user);
  }
}
