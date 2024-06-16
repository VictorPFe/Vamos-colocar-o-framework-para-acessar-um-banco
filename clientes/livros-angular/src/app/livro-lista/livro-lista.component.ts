import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro';
import { Editora } from '../editora';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livro.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})


export class LivroListaComponent implements OnInit {
  public editoras: Array<Editora> = [];
  public livros: Array<Livro> = [];

  constructor(private servEditora: ControleEditoraService, private servLivros: ControleLivrosService) { }

  ngOnInit(): void {
    this.controleLivros.obterTodos()
      .then(livros => this.livros = livros);
  }  

  excluir(codigo: string): void {
    this.controleLivros.excluir(codigo)
      .then(() => this.controleLivros.obterTodos())
      .then(livros => this.livros = livros);
  }  

  incluir(): void {
    this.controleLivros.incluir(this.livro)
      .then(() => this.router.navigateByUrl('/lista'));
  }
}  