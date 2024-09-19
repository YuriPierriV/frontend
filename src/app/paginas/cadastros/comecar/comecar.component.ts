import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsLayoutComponent } from "../../../componentes/forms-layout/forms-layout.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GoogleComponent } from '../../../componentes/google/google.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swiper from 'swiper';


import { register } from 'swiper/element/bundle';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Usuario } from '../../../typings/models';
import { CommonModule } from '@angular/common';

register();

declare var google:any;

@Component({
  selector: 'app-comecar',
  standalone: true,
  imports: [
    CommonModule,
    GoogleComponent,
    FormsLayoutComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './comecar.component.html',
  styleUrl: './comecar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComecarComponent implements OnInit{
  user:Usuario = {}
  form!: FormGroup;

  constructor(private userService: UserService, private router: Router, private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.inicializarForm();
  }

  inicializarForm() {
    this.form = new FormGroup({
      nome: new FormControl(this.user.nome || '', Validators.required),
      email: new FormControl(this.user.email || '', [Validators.required, Validators.email]),
    });
  }

  obterControle(name: string): FormControl {
    const control = this.form.get(name);
    if (!control) {
      throw new Error('Controle não encontrado: ' + name);
    }
    return control as FormControl;
  }

  salvarComeco() {
    const novoContato = this.form.value;
    this.userService.salvarUsuario(novoContato,'Comecando um novo usuario!').subscribe({
      next: (response) => {
        console.log(response.message)
        if(response.message == 'Email já existe!'){
          console.log('passou aq')
          this.form.reset();
          this.router.navigateByUrl('/comecar');
        }else if(response.message == 'User nao confirmado!'){
          
          this.router.navigateByUrl('/cadastro');
        }else if(response.message == 'User created!'){
          this.userService.salvarToken(response.token); // Salva o token recebido
          this.userService.setUser(response.user); // Define o usuário atual
          this.form.reset();
          this.router.navigateByUrl('/cadastro');
        }
      },
    });
  }
}
