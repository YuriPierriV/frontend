import { Component } from '@angular/core';
import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../tokenauth/token.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../typings/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  token = '';
  user: User = {};

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.token();
    if (this.token) {
      this.userService.getUserData().subscribe({
        next: (user: User) => {
          this.user = user;
        },
        error: (err) => {
          if(err.error.msg == "Token has expired"){
            this.router.navigateByUrl("/login")
          }
        }
      });
    } else {
      console.error('Token não encontrado');
    }
  }
}
