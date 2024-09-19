import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { TokenService } from '../../tokenauth/token.service';
import { Usuario } from '../../typings/models';

@Component({
  selector: 'app-google',
  standalone: true,
  imports: [],
  templateUrl: './google.component.html',
  styleUrl: './google.component.css'
})
export class GoogleComponent implements OnInit {

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService // Injeção do TokenService
  
  ) { }

  user:Usuario = {}

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn() {
    this.ngZone.runOutsideAngular(() => {
      if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        google.accounts.id.initialize({
          client_id: '625884059106-2nr434rkfeart0c50tgdibdsdi5deo9s.apps.googleusercontent.com',
          callback: this.handleCredentialResponse.bind(this),
        });
      }
    });
  }

  handleGoogleSignIn() {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      google.accounts.id.prompt();
    }
  }

  handleCredentialResponse(response: any) {
    try {
      this.user.credential = response.credential
      this.userService.salvarUsuario(this.user,'Google acess').subscribe(
        (res: any) => {
          if (res.message === 'Login successful!') {
            this.tokenService.salvarToken(res.token); // Salvar o token
            this.userService.setUser(res.user);
            this.ngZone.run(() => this.router.navigate(['/painel']));
          } else if (res.message === 'User created!' || res.message === 'User nao confirmado!') {
            this.userService.setUser(res.user);
            this.ngZone.run(() => this.router.navigate(['/cadastro']));
          }
        },
        (error: any) => {
          console.error('Auth error:', error);
        }
      );
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }

}