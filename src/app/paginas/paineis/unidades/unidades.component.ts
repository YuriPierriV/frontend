import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../componentes/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsLayoutInverseComponent } from '../../../componentes/forms-layout-inverse/forms-layout-inverse.component';
import { MsgErroComponent } from '../../../componentes/msg-erro/msg-erro.component';
import { UserService } from '../../../services/user/user.service';
import { TokenService } from '../../../tokenauth/token.service';
import { Instituicao, Usuario, UsuarioCompleto } from '../../../typings/models';
import { CursoService } from '../../../services/curso/curso.service';
import { InstituicaoService } from '../../../services/instituicao/instituicao.service';

@Component({
  selector: 'app-unidades',
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
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnidadesComponent implements OnInit {
  user: UsuarioCompleto = {};
  form_unidade!: FormGroup;
  form_unidade_edit!: FormGroup;
  token = '';
  selectedPainel:any = '';
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
    this.token = this.tokenService.token();
    if (this.token) {
      this.userService.getUserData().subscribe({
        next: (resp: any) => {
          this.user = this.userService.inicializarUsuario(resp);
          if (this.user.instituicao && this.user.instituicao.confirmed) {
            
            const primeiraUnidade = this.user.instituicao.unidades?.[0];
            if (primeiraUnidade) {
              this.selectUnidade(primeiraUnidade.id);
              this.inicializarFormUnidade();
            }
          }
          else{
            this.router.navigateByUrl("/instituicao");
          }
          if (this.user.usuario?.confirmed === false || this.user.usuario?.confirmed == null) {
            this.router.navigateByUrl("/cadastro");
          }
        },
        error: (err) => {
          if (err.error.msg === "Token has expired") {
            this.router.navigateByUrl("/login");
          }
        }
      });
    } else {
      console.error('Token não encontrado');
      this.router.navigateByUrl("/login");
    }
  }


  inicializarFormUnidade() {
    this.form_unidade = this.formBuilder.group({
      nome_unidade: ['', Validators.required],
      telefone_unidade: ['', [Validators.required]],
      endereco_unidade: ['', Validators.required],
      estado_unidade: ['', [Validators.required]],
      cidade_unidade: ['', [Validators.required]],
      bairro_unidade: ['', [Validators.required]],
      cep_unidade: ['', Validators.required],
    });
  }

  inicializarFormUnidade_edit(id: any) {
    const unidade = this.user.instituicao?.unidades?.filter((unidade: { id: any; }) => unidade.id === id);
    if (unidade && unidade.length > 0) {
      this.form_unidade_edit = this.formBuilder.group({
        nome_unidade: [unidade[0].nome, Validators.required],
        telefone_unidade: [unidade[0].telefone, Validators.required],
        endereco_unidade: [unidade[0].endereco, Validators.required],
        estado_unidade: [unidade[0].estado, [Validators.required]],
        cidade_unidade: [unidade[0].cidade, [Validators.required]],
        bairro_unidade: [unidade[0].bairro, [Validators.required]],
        cep_unidade: [unidade[0].cep, Validators.required],
      });
    }
  }

  obterControle(name: string): FormControl {
    const control = this.form_unidade.get(name);
    if (!control) {
      throw new Error('Controle não encontrado: ' + name);
    }
    return control as FormControl;
  }

  salvarUnidade() {
    const novaUnidade = this.form_unidade.value;
    this.instituicaoService.salvarUnidade(novaUnidade).subscribe({
      next: (resp) => {
        this.userService.getUserData().subscribe({
          next: (resp: any) => {
            this.user = this.userService.inicializarUsuario(resp);
            if (this.user.instituicao?.confirmed) {
              const ultimaUnidadeIndex = this.user.instituicao.unidades?.length ? this.user.instituicao.unidades.length - 1 : null;
              if (ultimaUnidadeIndex !== null) {
                this.selectUnidade(this.user.instituicao.unidades![ultimaUnidadeIndex].id);
              }
              this.inicializarFormUnidade();
            }
            if (this.user.usuario?.confirmed === false || this.user.usuario?.confirmed == null) {
              this.router.navigateByUrl("/cadastro");
            }
          },
          error: (err) => {
            if (err.error.msg === "Token has expired") {
              this.router.navigateByUrl("/login");
            }
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editarUnidade() {
    const novaUnidade = this.form_unidade.value;
    this.instituicaoService.editarUnidade(novaUnidade).subscribe({
      next: (resp) => {
        this.userService.getUserData().subscribe({
          next: (resp: any) => {
            this.user = this.userService.inicializarUsuario(resp);
            if (this.user.instituicao?.confirmed) {
              const ultimaUnidadeIndex = this.user.instituicao.unidades?.length ? this.user.instituicao.unidades.length - 1 : null;
              if (ultimaUnidadeIndex !== null) {
                this.selectUnidade(this.user.instituicao.unidades![ultimaUnidadeIndex].id);
              }
              this.inicializarFormUnidade();
            }
            if (this.user.usuario?.confirmed === false || this.user.usuario?.confirmed == null) {
              this.router.navigateByUrl("/cadastro");
            }
          },
          error: (err) => {
            if (err.error.msg === "Token has expired") {
              this.router.navigateByUrl("/login");
            }
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
    this.filteredUnidades = this.user.instituicao?.unidades?.filter((unidade: { id: any; }) => unidade.id === this.selectedPainel);
    if (this.selectedPainel !== 'new unidade') {
      this.inicializarFormUnidade_edit(id);
    }
  }
}
