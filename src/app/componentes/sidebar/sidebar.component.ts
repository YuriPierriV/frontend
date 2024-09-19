import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../typings/user';
import { ActivatedRoute,  Router, RouterLink } from '@angular/router';
import { TokenService } from '../../tokenauth/token.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  collapsed: boolean = false;

  token = '';
  @Input() user: User | undefined;
  @Input() page?: string;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  sair(){
    this.tokenService.excluirToken();
    this.router.navigateByUrl('')
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    console.log(this.collapsed);
  }

  
}