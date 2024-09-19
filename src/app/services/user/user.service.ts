import { Injectable } from '@angular/core';
import { User } from '../../typings/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../tokenauth/token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = {};
  private readonly API = 'http://localhost:5000/usuarios';
  private userSubject = new BehaviorSubject<User | null>(null);  //BehaviorSubject para gerenciar o estado do usuário

  constructor(private http: HttpClient, private tokenService: TokenService) {
    if (this.tokenService.possuiToken()) {
      this.decodificarJWT(); // Se o token existir, decodifica o JWT
    }
  }




  setUser(user: User): void {
    this.user = user; // Define o usuário
    this.userSubject.next(user); // Atualiza o BehaviorSubject com o novo usuário
  }

  getUser(): User {
    return this.user; // Retorna o usuário atual
  }


  

  decodificarJWT() {
    const token = this.tokenService.token(); // Obtém o token do serviço de token
    if (token) {
      try {
        const user = jwtDecode<User>(token); // Decodifica o token para obter o usuário
        this.setUser(user); // Define o usuário decodificado
      } catch (error) {
        console.error('Erro ao decodificar o token JWT', error); // Erro se a decodificação falhar
      }
    }
  }

  retornarUsuario(): Observable<User | null> {
    return this.userSubject.asObservable(); // Retorna um Observable do usuário atual
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token); //salva o token 
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.excluirToken(); //exclui o token
    this.userSubject.next(null);
  }

  logged(): boolean {
    return this.tokenService.possuiToken(); //verifica se tem login
  }

  getUserData(): Observable<User> {
    return this.http.get<User>(this.API); //solicita user do bd
  }

  salvarUsuario(user: User): Observable<any> {
    return this.http.post<any>(this.API, user); // salva usuario
  }

  editarCadastro(user: User): Observable<any> {
    const url = `${this.API}/${user.id}`;
    return this.http.put<any>(url, user); // edita usuario
  }
}
