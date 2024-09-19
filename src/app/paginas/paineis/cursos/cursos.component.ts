import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../componentes/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsLayoutInverseComponent } from '../../../componentes/forms-layout-inverse/forms-layout-inverse.component';
import { MsgErroComponent } from '../../../componentes/msg-erro/msg-erro.component';
import { CursoService } from '../../../services/curso/curso.service';
import { UserService } from '../../../services/user/user.service';
import { TokenService } from '../../../tokenauth/token.service';
import { UsuarioCompleto } from '../../../typings/models';

@Component({
  selector: 'app-cursos',
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
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CursosComponent implements OnInit {
  objeto: UsuarioCompleto = {};
  form_novoCurso!: FormGroup;
  form_editCurso!: FormGroup;
  token = '';
  selectedPainel = '';
  selectedCurso = '';
  filteredUnidades: any = {};
  filteredCurso: any = null;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.token();
    if (this.token) {
      this.userService.getUserData().subscribe({
        next: (resp: any) => {
          this.objeto = this.userService.inicializarUsuario(resp);
          if (!this.objeto.instituicao) {
            this.router.navigateByUrl("/instituicao");
          } else {
            if (this.objeto.instituicao.confirmed) {
              this.selectUnidade(this.objeto.instituicao.unidades?.[0]?.id || '');
              if (this.filteredUnidades[0]?.cursos?.length > 0) {
                this.selectCurso(this.filteredUnidades[0]?.cursos?.[0]?.id || '');
                this.inicializarFormNovoCurso(this.filteredUnidades[0]?.id);
              }
            }else{
              this.router.navigateByUrl("/unidades");
            }

            if (this.objeto.usuario?.confirmed === false || this.objeto.usuario?.confirmed === null) {
              this.router.navigateByUrl("/cadastro");
            }
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

  inicializarFormNovoCurso(id: number) {
    this.form_novoCurso = this.formBuilder.group({
      nome: ['', Validators.required],
      desc: ['', Validators.required],
      id_unidade: [id]
    });
  }

  inicializarFormEditCurso() {
    this.form_editCurso = this.formBuilder.group({
      nome: ['', Validators.required],
      desc: ['', Validators.required],
    });
  }

  obterControle(name: string): FormControl {
    const control = this.form_novoCurso.get(name);
    if (!control) {
      throw new Error('Controle não encontrado: ' + name);
    }
    return control as FormControl;
  }

  cadastrarCurso() {
    const novoCurso = this.form_novoCurso.value;
    this.cursoService.cadastrarCurso(novoCurso).subscribe({
      next: (resp) => {
        this.userService.getUserData().subscribe({
          next: (resp: any) => {
            this.objeto = this.userService.inicializarUsuario(resp);
            this.filteredUnidades = this.objeto.instituicao?.unidades?.filter((unidade: { id: any; }) => unidade.id === this.selectedPainel);
            if (this.filteredUnidades?.[0]?.cursos?.length > 0) {
              const ultimoCursoIndex = this.filteredUnidades[0].cursos.length - 1;
              this.selectCurso(this.filteredUnidades[0].cursos[ultimoCursoIndex].id);
              this.inicializarFormNovoCurso(this.filteredUnidades[0].id);
            }
          },
          error: (err) => {
            console.error('Erro ao atualizar dados do usuário:', err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editarCurso() {
    const novoCurso = this.form_editCurso.value;
    this.cursoService.editarCurso(novoCurso).subscribe({
      next: (resp) => {
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  selectUnidade(id: any) {
    this.selectedPainel = id;
    this.filteredUnidades = this.objeto.instituicao?.unidades?.filter((unidade: { id: any; }) => unidade.id === this.selectedPainel) || [];
    this.filteredCurso = this.filteredUnidades[0]?.cursos?.filter((curso: { id: any; }) => curso.id === this.selectedCurso) || null;
    this.inicializarFormNovoCurso(this.filteredUnidades[0]?.id || 0);
  }

  selectCurso(id: any) {
    if (id === 'new curso') {
      this.selectedCurso = id;
      this.filteredCurso = null;
    } else {
      this.selectedCurso = id;
      this.filteredCurso = this.filteredUnidades[0]?.cursos?.filter((curso: { id: any; }) => curso.id === this.selectedCurso) || null;
    }
  }
}
