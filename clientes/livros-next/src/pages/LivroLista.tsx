import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '../../componente/Menu';
import styles from '../styles/Home.module.css';
import LinhaLivro from '../../componente/LinhaLivro';
import Livros from '../../classes/modelo/Livro';

const baseURL = "http://localhost:3000/api/livros";

const obter = async () => {
  const resposta = await fetch(baseURL);
  const dados = await resposta.json();
  return dados;
};

const excluirLivro = async (codigo: number) => {
  const resposta = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
  const dados = await resposta.json();
  return dados.ok;
};

const LivroLista = () => {
  const [livros, setLivros] = useState<Livros[]>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    obter().then((dados) => {
      setLivros(dados);
      setCarregado(true);
    });
  }, [carregado]);

  const excluir = async (codigo: string) => {
    await controleLivros.excluir(codigo);
    setCarregado(false);
    if (ok) {
      setLivros((livrosAtuais) => livrosAtuais.filter((livro) => livro.codigo !== codigo));
    }
    return ok;
  };

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Livros
        </h1>
        <table className='table w-1oo mx-auto'>
          <thead>
            <tr className='text-light bg-dark'>
              <th>Código</th>
              <th>Título</th>
              <th>Editora</th>
              <th>Resumo</th>
              <th>Autor</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro
                livro={livro}
                excluir={() => excluir(livro.codigo).then(() => setCarregado(false))}
                key={livro.codigo}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
