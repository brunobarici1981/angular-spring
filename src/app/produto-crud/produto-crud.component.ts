import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ✅ IMPORTAR AQUI
import { Produto, ProdutoService } from '../services/produto.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-produto-crud',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './produto-crud.component.html',
  styleUrls: ['./produto-crud.component.scss']
})
export class ProdutoCrudComponent implements OnInit {
  form!: FormGroup;
  produtos: Produto[] = [];
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'preco', 'acoes'];
  editandoId: number | null = null;

  constructor(private fb: FormBuilder, private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0)]],
    });

    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe(data => this.produtos = data);
  }

  salvar() {
    const produto = this.form.value as Produto;

    if (this.editandoId) {
      this.produtoService.atualizarProduto(this.editandoId, produto).subscribe(() => {
        this.carregarProdutos();
        this.resetarFormulario();
      });
    } else {
      this.produtoService.criarProduto(produto).subscribe(() => {
        this.carregarProdutos();
        this.resetarFormulario();
      });
    }
  }

  editar(produto: Produto) {
    this.editandoId = produto.id!;
    this.form.patchValue(produto);
  }

  deletar(id: number) {
    this.produtoService.deletarProduto(id).subscribe(() => this.carregarProdutos());
  }

  resetarFormulario() {
    this.editandoId = null;
    this.form.reset();
    this.form.patchValue({ preco: 0 });
  }
}

