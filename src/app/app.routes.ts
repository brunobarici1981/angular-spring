
import { Component } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ProdutoCrudComponent } from './produto-crud/produto-crud.component';

export const routes : Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'courses'},
  {path:'courses', loadChildren:()=>import('./courses/courses.module').then(m=>m.CoursesModule)},
  {path: 'loginUser', component: TelaLoginComponent},
  {path: 'cadastroCliente',component: CadastroClienteComponent},
  {path: 'cadastroProdutos', component: ProdutoCrudComponent}
];
