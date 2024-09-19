import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsLayoutInverseComponent } from '../../../componentes/forms-layout-inverse/forms-layout-inverse.component';
import { MsgErroComponent } from '../../../componentes/msg-erro/msg-erro.component';
import { SidebarComponent } from '../../../componentes/sidebar/sidebar.component';
import { UserService } from '../../../services/user/user.service';
import { TokenService } from '../../../tokenauth/token.service';
import { UsuarioCompleto } from '../../../typings/models';
import { ConviteProfessorService } from '../../../services/convite/convite-professor.service';
import { DateFormatPipe } from '../../../componentes/pipe/date-format.pipe';

@Component({
  selector: 'app-professores',
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
    DateFormatPipe
  ],
  providers: [provideNgxMask()],
  templateUrl: './professores.component.html',
  styleUrl: './professores.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfessoresComponent implements OnInit {
  objeto: UsuarioCompleto = {};
  form_novoProfessor!: FormGroup;
  token = '';
  selectedPainel = '';
  selectedCurso = '';
  selectedProfessor = '';
  filteredUnidades: any = {};
  filteredCurso: any = null;
  filteredProfessor: any = null;
  menuProfessor: string = 'cadastrados';
  alert:any = null;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private conviteProfessorService: ConviteProfessorService
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
              if (this.filteredUnidades?.[0]?.professores?.length > 0) {
                this.selectProfessor(this.filteredUnidades?.[0]?.professores?.[0]?.id || '');
              }
            }
            else{
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

  inicializarFormNovoProfessor(id: number) {
    this.form_novoProfessor = this.formBuilder.group({
      email_professor: ['', [Validators.required, Validators.email]],
      id_unidade: [id]
    });
  }

  obterControle(name: string): FormControl {
    const control = this.form_novoProfessor.get(name);
    if (!control) {
      throw new Error('Controle não encontrado: ' + name);
    }
    return control as FormControl;
  }

  selectUnidade(id: any) {
    this.selectedPainel = id;
    this.filteredUnidades = this.objeto.instituicao?.unidades?.filter((unidade: { id: any; }) => unidade.id === this.selectedPainel) || [];
    this.filteredCurso = this.filteredUnidades[0]?.cursos?.filter((curso: { id: any; }) => curso.id === this.selectedCurso) || null;
    this.inicializarFormNovoProfessor(this.filteredUnidades[0]?.id || 0);
    console.log(this.filteredUnidades)
  }

  selectProfessor(id: any) {
    if (id === 'new professor') {
      this.selectedProfessor = id;
      this.filteredProfessor = null;
    } else {
      this.selectedProfessor = id;
      this.filteredProfessor = this.filteredUnidades[0]?.professores?.filter((professor: { id: any; }) => professor.id === this.selectedProfessor) || null;
    }
  }

  convidarProfessor() {
    const convite = this.form_novoProfessor.value;
    this.conviteProfessorService.cadastrarConvite(convite).subscribe({
      next: (resp) => {
        this.selectProfessor(resp.resp.id)
        this.selectMenuProfessor('pendentes');
      },
      error: (error) => {
        if(error.error.msg == 'Professor já foi convidado para esta unidade'){
          this.selectProfessor(error.error.id)
          this.selectMenuProfessor('pendentes');
        }
        this.alert = error;
          setTimeout(() => {
            this.alert = null;
          }, 5000);
        // Lógica de erro
      }
    });
  }

  selectMenuProfessor(menu: string) {
    this.menuProfessor = menu;
  }
}
