import { Component, OnInit } from '@angular/core';
import { GoogleComponent } from '../../componentes/google/google.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsLayoutComponent } from '../../componentes/forms-layout/forms-layout.component';
import { User } from '../../typings/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../tokenauth/auth.service';
import { MainImageComponent } from "../../componentes/main-image/main-image.component";
import { MsgErroComponent } from "../../componentes/msg-erro/msg-erro.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    GoogleComponent,
    FormsLayoutComponent,
    RouterLink,
    ReactiveFormsModule,
    MainImageComponent,
    MsgErroComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  user: User = {};
  form!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });
  }

  obterControle(name: string): FormControl {
    const control = this.form.get(name);
    if (!control) {
      throw new Error('Controle não encontrado: ' + name);
    }
    return control as FormControl;
  }

  fazerLogin() {
    const email = this.form.value.email;
    const senha = this.form.value.senha;

    this.authService.autenticar(email, senha).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.log("Erro no login", err);
      }
    });
  }
}