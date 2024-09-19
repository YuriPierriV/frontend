import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../componentes/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { TokenService } from '../../../tokenauth/token.service';
import { UsuarioCompleto } from '../../../typings/models';
import { CommonModule } from '@angular/common';
import { ConviteProfessorService } from '../../../services/convite/convite-professor.service';
import { DateFormatPipe } from '../../../componentes/pipe/date-format.pipe';
import { MsgService } from '../../../services/msg/msg.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    DateFormatPipe
  ],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  animations: [
    trigger('expandWidth', [
      state('void', style({ width: '0%',opacity: '0' })),
      state('*', style({ width: '100%', opacity: '1' })),
      transition('void => *', [
        animate('500ms ease-in')
      ])
    ])
  ]
})
export class InboxComponent implements OnInit {
  objeto: UsuarioCompleto = {};
  loading: boolean = true;
  mensagens_enviadas: any = [];
  mensagens_recebidas: any = [];
  selectedMenu: string = 'add';
  selectedId: number = 0;
  selectedType:string = 'direta';
  naoLidas:any = [];
  token = '';

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router,
    private conviteProfessorService: ConviteProfessorService,
    private msgService: MsgService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.token();
    if (this.token) {
      this.userService.getUserData().subscribe({
        next: (resp: any) => {
          this.objeto = this.userService.inicializarUsuario(resp);
          this.mensagens_enviadas = this.objeto.usuario?.mensagens_enviadas;
          this.mensagens_recebidas = this.objeto.usuario?.mensagens_recebidas;
          this.naoLidas = this.mensagens_recebidas.filter((mensagem: { status: string; }) => mensagem.status === 'enviado');
          this.selectMenu(this.selectedMenu);
          this.loading = false;

          if (this.objeto.usuario?.confirmed === false || this.objeto.usuario?.confirmed === null) {
            this.router.navigateByUrl("/cadastro");
          }
        },
        error: (err) => {
          if (err.error.msg === "Token has expired") {
            this.router.navigateByUrl("/login");
          } else {
            this.router.navigateByUrl("/login");
          }
        }
      });
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
    this.toggleCollapse(0)
  }

  toggleMsgType(type:string){
    this.selectedType = type
  }

  toggleCollapse(id: number) {
    this.selectedId = id;
    const selectedMsg = this.mensagens_recebidas.filter((mensagem: { id: number; }) => mensagem.id === id)
    if(id > 0 && selectedMsg[0]?.status === 'enviado'){
      this.msgService.atualizarMsgStatus(id,'lido').subscribe({
        next:(resp:any) =>{
          this.userService.getUserData().subscribe({
            next: (resp: any) => {
              this.objeto = this.userService.inicializarUsuario(resp);
              this.mensagens_enviadas = this.objeto.usuario?.mensagens_enviadas;
              this.mensagens_recebidas = this.objeto.usuario?.mensagens_recebidas;
              this.naoLidas = this.mensagens_recebidas.filter((mensagem: { status: string; }) => mensagem.status === 'enviado');
              this.loading = false;
    
              if (this.objeto.usuario?.confirmed === false || this.objeto.usuario?.confirmed === null) {
                this.router.navigateByUrl("/cadastro");
              }
            },
            error: (err) => {
              if (err.error.msg === "Token has expired") {
                this.router.navigateByUrl("/login");
              } else {
                this.router.navigateByUrl("/login");
              }
            }
          });
        },
        error:(err:any)=>{
  
        }
      })
    }
    
  }

  isCollapsed(id: number): boolean {
    return this.selectedId === id;
  }

  aceitarConvite(convite: any) {
    this.conviteProfessorService.replayConvite(convite, 'aceitar').subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  recusarConvite(convite: any) {
    this.conviteProfessorService.replayConvite(convite, 'recusar').subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
