import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <h2>Cadastro de Cliente</h2>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="nome">
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email">
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>CPF</mat-label>
            <input matInput formControlName="cpf">
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>CEP</mat-label>
            <input matInput formControlName="cep" (blur)="buscarEndereco()">
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Endereço</mat-label>
            <input matInput formControlName="endereco">
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Cidade</mat-label>
            <input matInput formControlName="cidade">
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Estado</mat-label>
            <input matInput formControlName="estado">
          </mat-form-field>
          <!-- Campo Senha -->
<mat-form-field appearance="fill" class="full-width">
  <mat-label>Senha</mat-label>
  <input matInput formControlName="senha" type="password">
</mat-form-field>

<!-- Campo Confirmar Senha -->
<mat-form-field appearance="fill" class="full-width">
  <mat-label>Confirmar Senha</mat-label>
  <input matInput formControlName="confirmarSenha" type="password">
</mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Salvar</button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }
    mat-card {
      width: 100%;
      max-width: 500px;
      padding: 2rem;
    }
    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }
  `]
})
export class CadastroClienteComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
  nome: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  cpf: ['', Validators.required],
  cep: ['', Validators.required],
  endereco: ['', Validators.required],
  cidade: ['', Validators.required],
  estado: ['', Validators.required],
  senha: ['', [Validators.required, Validators.minLength(6)]],
  confirmarSenha: ['', Validators.required]
}, {
  validators: this.senhasIguaisValidator
});
  }
  senhasIguaisValidator(group: AbstractControl): ValidationErrors | null {
  const senha = group.get('senha')?.value;
  const confirmarSenha = group.get('confirmarSenha')?.value;
  return senha === confirmarSenha ? null : { senhasDiferentes: true };
}

  buscarEndereco() {
    const cep = this.form.get('cep')?.value?.replace(/\D/g, '');

    if (cep?.length !== 8) {
      this.snackBar.open('CEP inválido', 'Fechar', { duration: 3000 });
      return;
    }

    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
      .subscribe({
        next: data => {
          if (data.erro) {
            this.snackBar.open('CEP não encontrado', 'Fechar', { duration: 3000 });
            return;
          }
          this.form.patchValue({
            endereco: data.logradouro,
            cidade: data.localidade,
            estado: data.uf
          });
        },
        error: () => {
          this.snackBar.open('Erro ao buscar CEP', 'Fechar', { duration: 3000 });
        }
      });
  }

 onSubmit() {
  if (this.form.valid) {
    this.http.post('http://localhost:8080/api/clientes', this.form.value)
      .subscribe({
        next: () => {
          this.snackBar.open('Cliente cadastrado com sucesso!', 'Fechar', { duration: 3000 });
          this.form.reset();
        },
        error: (err) => {
          console.error('Erro ao salvar cliente:', err);
          this.snackBar.open('Erro ao salvar cliente', 'Fechar', { duration: 3000 });
        }
      });
  }
 }
}
