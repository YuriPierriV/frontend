import { Routes } from '@angular/router';

import { InicioComponent } from './paginas/inicio/inicio.component';
import { ComecarComponent } from './paginas/cadastros/comecar/comecar.component';
import {  PainelComponent } from './paginas/paineis/painel/painel.component';
import { LoginComponent } from './paginas/login/login.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './paginas/paineis/dashboard/dashboard.component';
import { CadastroComponent } from './paginas/cadastros/cadastro/cadastro.component';
import { InstituicoesComponent } from './paginas/paineis/instituicoes/instituicoes.component';
import { UnidadesComponent } from './paginas/paineis/unidades/unidades.component';
import { CursoService } from './services/curso/curso.service';
import { CursosComponent } from './paginas/paineis/cursos/cursos.component';
import { ProfessoresComponent } from './paginas/paineis/professores/professores.component';
import { InboxComponent } from './paginas/paineis/inbox/inbox.component';


export const routes: Routes = [
    {
        path: '',
        component:InicioComponent,
        pathMatch:'full'
    },
    {
        path: 'comecar',
        component: ComecarComponent
    },
    {
        path: 'cadastro',
        component:CadastroComponent
    },

    

    {
        path: 'login',
        component:LoginComponent
    },

    {
        path: 'instituicao',
        component:InstituicoesComponent,
        canActivate:[authGuard]
    },

    {
        path: 'unidades',
        component:UnidadesComponent,
        canActivate:[authGuard]
    },

    {
        path: 'cursos',
        component:CursosComponent,
        canActivate:[authGuard]
    },

    {
        path: 'professores',
        component:ProfessoresComponent,
        canActivate:[authGuard]
    },

    {
        path: 'inbox',
        component:InboxComponent,
        canActivate:[authGuard]
    },





    {
        path: 'painel',
        component:PainelComponent,
        canActivate:[authGuard]
    },
    {
        path: 'dashboard',
        component:DashboardComponent,
        canActivate:[authGuard]
    },
    
    


];
