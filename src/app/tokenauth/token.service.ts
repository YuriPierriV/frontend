import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';

  salvarToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token); //salva token no local storage
  }

  excluirToken() {
    localStorage.removeItem(this.TOKEN_KEY); // exclui token do local storage
  }

  token(): string {
    return localStorage.getItem(this.TOKEN_KEY) || ''; // retorna o token do local storage 
  }

  possuiToken(): boolean {
    return !!this.token(); // retorna se possui token 
  }
}