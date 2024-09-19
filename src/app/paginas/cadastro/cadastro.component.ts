import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { User } from '../../typings/user';
import { UserService } from '../../services/user/user.service';
import { FormsLayoutInverseComponent } from '../../componentes/forms-layout-inverse/forms-layout-inverse.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MsgErroComponent } from '../../componentes/msg-erro/msg-erro.component';
import { senhaValidator } from '../../validators/validators';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FormsLayoutInverseComponent,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    MsgErroComponent,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CadastroComponent implements OnInit {
  user: User = {};
  form!: FormGroup;

  constructor(private userService: UserService, private router: Router, private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.inicializarForm();
  }

  inicializarForm() {
    this.form = new FormGroup({
      nome: new FormControl(this.user.nome || '', Validators.required),
      sobrenome: new FormControl(this.user.sobrenome || '', Validators.required),
      email: new FormControl(this.user.email || '', [Validators.required, Validators.email]),
      telefone: new FormControl(this.user.telefone || '', [Validators.required, Validators.minLength(8)]),
      senha: new FormControl('', [Validators.required, senhaValidator()]),
      genero: new FormControl(this.user.genero || '', Validators.required),
      nasc: new FormControl(this.user.nascimento ? this.user.nascimento.toString().split('T')[0] : '', Validators.required),
      tipo: new FormControl(this.user.tipo || '', Validators.required),
    });
  }

  obterControle(name: string): FormControl {
    const control = this.form.get(name);
    if (!control) {
      throw new Error('Controle não encontrado: ' + name);
    }
    return control as FormControl;
  }

  salvarContato() {
    const novoContato = this.form.value;
    this.userService.salvarUsuario(novoContato).subscribe({
      next: (response) => {
        this.userService.salvarToken(response.token); // Salva o token recebido
        this.userService.setUser(response.user); // Define o usuário atual
        this.form.reset();
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        
        console.error('Erro ao salvar contato', err);
      }
    });
  }
}
