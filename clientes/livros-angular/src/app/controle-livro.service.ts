import { Injectable } from '@angular/core';
import { Livro } from './livro';

const baseURL = "http://localhost:3030/livros";

interface LivroMongo {
    codigo: number;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string;
}

@Injectable()

export class ControleLivrosService {
  async obterLivros(): Promise<Livro[]> {
    const response = await fetch(baseURL, { method: 'GET' });
    const livrosMongo: LivroMongo[] = await response.json();
    return livrosMongo.map(livroMongo => {
      const livro = new Livro();
      livro.codigo = livroMongo.codigo;
      livro.codEditora = livroMongo.codEditora;
      livro.resumo = livroMongo.resumo;
      livro.autores = livroMongo.autores;
      return livro;
    });
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      codigo: livro.codigo,
      codEditora: livro.codEditora,
      resumo: livro.resumo,
      autores: livro.autores
    };
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livroMongo)
    });
    const result = await response.json();
    return result.ok;
  }
  

  async excluir(codigo: string): Promise<boolean> {
    const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
    const result = await response.json();
    return result.ok;
  }
}