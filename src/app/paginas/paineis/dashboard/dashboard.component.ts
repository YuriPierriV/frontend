import { Component } from '@angular/core';
import { Usuario } from '../../../typings/models';
import { SidebarComponent } from '../../../componentes/sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { PhoneFormatPipe } from '../../../componentes/pipe/phone-format.pipe';
import { TokenService } from '../../../tokenauth/token.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterLink,
    PhoneFormatPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  /*
  token = '';
  user: Usuario = {};

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
          console.log(this.user)
          if(user.confirmed == false || user.confirmed == null){
            this.router.navigateByUrl("/cadastro")
          }
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
  }*/
}
