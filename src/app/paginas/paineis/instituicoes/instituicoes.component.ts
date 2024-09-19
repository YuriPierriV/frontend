import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsLayoutInverseComponent } from '../../../componentes/forms-layout-inverse/forms-layout-inverse.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MsgErroComponent } from '../../../componentes/msg-erro/msg-erro.component';
import { Aluno, Instituicao, Professor, Usuario, UsuarioCompleto } from '../../../typings/models';
import { UserService } from '../../../services/user/user.service';
import { senhaValidator } from '../../../validators/validators';
import { SidebarComponent } from '../../../componentes/sidebar/sidebar.component';
import { TokenService } from '../../../tokenauth/token.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { InstituicaoService } from '../../../services/instituicao/instituicao.service';

@Component({
  selector: 'app-instituicoes',
  standalone: true,
  imports: [
    SidebarComponent,
    FormsLayoutInverseComponent,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    MsgErroComponent,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
  templateUrl: './instituicoes.component.html',
  styleUrls: ['./instituicoes.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InstituicoesComponent implements OnInit {
  objeto: UsuarioCompleto = {};
  token: string = '';
  collapsed: boolean = false;
  loading: boolean = true;
  convites: any = [];
  form_instituicao_unidade!: FormGroup;
  form_unidade!: FormGroup;
  form_unidade_edit!: FormGroup;
  selectedPainel = '';
  filteredUnidades: any = {};

  estados: Array<{ nome: string, sigla: string }> = [
    { nome: 'Acre', sigla: 'AC' },
    { nome: 'Alagoas', sigla: 'AL' },
    { nome: 'Amapá', sigla: 'AP' },
    { nome: 'Amazonas', sigla: 'AM' },
    { nome: 'Bahia', sigla: 'BA' },
    { nome: 'Ceará', sigla: 'CE' },
    { nome: 'Distrito Federal', sigla: 'DF' },
    { nome: 'Espírito Santo', sigla: 'ES' },
    { nome: 'Goiás', sigla: 'GO' },
    { nome: 'Maranhão', sigla: 'MA' },
    { nome: 'Mato Grosso', sigla: 'MT' },
    { nome: 'Mato Grosso do Sul', sigla: 'MS' },
    { nome: 'Minas Gerais', sigla: 'MG' },
    { nome: 'Pará', sigla: 'PA' },
    { nome: 'Paraíba', sigla: 'PB' },
    { nome: 'Paraná', sigla: 'PR' },
    { nome: 'Pernambuco', sigla: 'PE' },
    { nome: 'Piauí', sigla: 'PI' },
    { nome: 'Rio de Janeiro', sigla: 'RJ' },
    { nome: 'Rio Grande do Norte', sigla: 'RN' },
    { nome: 'Rio Grande do Sul', sigla: 'RS' },
    { nome: 'Rondônia', sigla: 'RO' },
    { nome: 'Roraima', sigla: 'RR' },
    { nome: 'Santa Catarina', sigla: 'SC' },
    { nome: 'São Paulo', sigla: 'SP' },
    { nome: 'Sergipe', sigla: 'SE' },
    { nome: 'Tocantins', sigla: 'TO' }
  ];

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private instituicaoService: InstituicaoService
  ) {}

  ngOnInit(): void {
    this.inicializarToken();
    if (this.token) {
      this.carregarDadosUsuario();
    } else {
      this.redirecionarParaLogin();
    }
    this.inicializarForm(); // Inicializar o formulário aqui
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

  inicializarForm() {
    this.form_instituicao_unidade = this.formBuilder.group({
      nome_instituicao: ['', Validators.required],
      nome_unidade: ['', Validators.required],
      telefone_unidade: ['', [Validators.required]],
      estado_unidade: ['', [Validators.required]],
      cidade_unidade: ['', [Validators.required]],
      bairro_unidade: ['', [Validators.required]],
      cep_unidade: ['', Validators.required],
      endereco_unidade: ['', Validators.required],
    });
  }

  obterControle(name: string): FormControl {
    const control = this.form_instituicao_unidade.get(name);
    if (!control) {
      throw new Error('Controle não encontrado: ' + name);
    }
    return control as FormControl;
  }

  salvarInstituicaoUnidade() {
    const novaInstituicaoUnidade = this.form_instituicao_unidade.value;
    
    this.instituicaoService.salvarInstituicao(novaInstituicaoUnidade.nome_instituicao).subscribe({
      next: (resp) => {
        this.instituicaoService.salvarUnidade(novaInstituicaoUnidade).subscribe({
          next: (resp) => {
            location.reload()
          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  selectUnidade(id: any) {
    this.selectedPainel = id;
    this.filteredUnidades = this.objeto.unidades?.filter((unidade: { id: any; }) => unidade.id === this.selectedPainel);
  }
}
