// tela-login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import e from 'express';



@Component({
  selector: 'app-tela-login',
  imports:[MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit {

  loginForm!: FormGroup;
   erroLogin = '';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }
   irParaCadastro() {
    this.router.navigate(['/cadastroCliente']); // ajuste a rota se for diferente
  }
onSubmit() {
  const { email, senha } = this.loginForm.value;

  this.http.post<any>('http://localhost:8080/loginUser', { email, senha })
    .subscribe({
      next: (res) => {
        if (res.success) {
          // Login OK: redireciona
          this.router.navigate(['/cadastroProdutos']); // ou a rota da sua página inicial
        } else {
          // Login inválido
          this.erroLogin = res.message || 'Usuário ou senha inválidos';
        }
      },
      error: (err) => {
        console.error('Erro na requisição de login:', err);
        this.erroLogin = 'Erro ao conectar com o servidor.';
      }
    });
}

  onLogin(): void {
    const { email, senha } = this.loginForm.value;

    this.http.post<any>('http://localhost:8080/loginUser', { email, senha }).subscribe({
      next: (res) => {
        this.snackBar.open('Login realizado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/home']); // redireciona para a tela principal
      },
      error: () => {
        this.snackBar.open('Email ou senha inválidos!', 'Fechar', { duration: 3000 });
      }
    });
  }
}

