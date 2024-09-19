import { Routes } from '@angular/router';

import { InicioComponent } from './paginas/inicio/inicio.component';
import { ComecarComponent } from './paginas/comecar/comecar.component';
import {  HomeComponent } from './paginas/home/home.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { LoginComponent } from './paginas/login/login.component';
import { authGuard } from './guards/auth.guard';

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
        path: 'home',
        component:HomeComponent,
        canActivate:[authGuard]
    },
    {
        path: 'cadastro',
        component:CadastroComponent
    },
    {
        path: 'login',
        component:LoginComponent
    }


];
