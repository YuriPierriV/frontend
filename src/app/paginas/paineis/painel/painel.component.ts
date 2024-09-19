import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../componentes/sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../../tokenauth/token.service';
import { UserService } from '../../../services/user/user.service';
import { Aluno, ConviteProfessor, Curso, Instituicao, Professor, ProfessorUnidade, Turma, TurmaAluno, TurmaCurso, Unidade, Usuario, UsuarioCompleto } from '../../../typings/models';
import { PhoneFormatPipe } from '../../../componentes/pipe/phone-format.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    RouterLink,
    PhoneFormatPipe
  ],
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  objeto: UsuarioCompleto = {};
  loading: boolean = true;
  token: string = '';

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarToken();
    if (this.token) {
      this.carregarDadosUsuario();
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
        this.loading = false;
      },
      error: (err) => {
        this.tratarErroCarregamentoUsuario(err);
      }
    });
  }

  processarDadosUsuario(resp: any): void {
    this.objeto = this.userService.inicializarUsuario(resp);
    if (!this.objeto.usuario?.confirmed) {
      this.redirecionarParaCadastro();
    } else {
      switch (this.objeto.usuario.tipo) {
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
}
