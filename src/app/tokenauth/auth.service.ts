import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user/user.service';

interface AuthResponse{
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private userService: UserService) { }

  autenticar(email: string, senha: string): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      { email, senha },
      { observe: 'response' }
    ).pipe(
      tap((response) => {
        const authToken = response.body?.access_token || '';
        if (authToken) {
          this.userService.salvarToken(authToken);  // se receber um token salva no local storage
        } else {
          console.error('Token de autenticação está vazio ou inválido.');
        }
      })
    );
  }
}