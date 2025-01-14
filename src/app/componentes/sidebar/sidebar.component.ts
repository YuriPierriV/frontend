import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Aluno, Instituicao, Professor, Usuario, UsuarioCompleto } from '../../typings/models';
import { ActivatedRoute,  Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenService } from '../../tokenauth/token.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  objeto: UsuarioCompleto = {};
  token: string = '';
  
  collapsed: boolean = false;
  user: Usuario = {};
  loading: boolean = true;
  mensagens: any = [];
  

  @Input() page?: string = 'geral';
  @Input() naoLidas?: any = [];
  @Input() alert?: any = null;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.inicializarToken();
    if (this.token) {
      this.carregarDadosUsuario();
      this.loading = false;
    } else {
      this.redirecionarParaLogin();
    }
  }

  inicializarToken(): void {
    this.token = this.tokenService.token();
    if (!this.token) {
      console.error('Token não encontrado');
    }
  }

  carregarDadosUsuario(): void {
    this.userService.getUserData().subscribe({
      next: (resp: any) => {
        this.processarDadosUsuario(resp);
        console.log(this.objeto);
      },
      error: (err) => {
        this.tratarErroCarregamentoUsuario(err);
      }
    });
  }

  processarDadosUsuario(resp: any): void {
    this.objeto = this.userService.inicializarUsuario(resp);
    this.mensagens = this.objeto.usuario?.mensagens_recebidas;
    this.naoLidas = this.mensagens.filter((mensagem: { status: string; }) => mensagem.status === 'enviado');
    if (!this.objeto.usuario?.confirmed) {
      this.redirecionarParaCadastro();
    } else {
      switch (this.objeto.usuario?.tipo) {
        case 'aluno':
          // lógica para aluno
          break;
        case 'instituicao':
          // lógica para instituicao
          break;
        case 'professor':
          // lógica para professor
          break;
      }
    }
  }

  tratarErroCarregamentoUsuario(err: any): void {
    if (err.error.msg === "Token has expired") {
      this.redirecionarParaLogin();
    } else {
      this.redirecionarParaLogin();
    }
  }

  redirecionarParaCadastro(): void {
    this.router.navigateByUrl("/cadastro");
  }

  redirecionarParaLogin(): void {
    this.router.navigateByUrl("/login");
  }


  sair(){
    this.tokenService.excluirToken();
    this.router.navigateByUrl('')
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  escolherPage(){

  }

  
  
}