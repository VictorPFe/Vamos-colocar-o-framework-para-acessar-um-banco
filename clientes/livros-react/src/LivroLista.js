import { useState, useEffect } from 'react';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

function LinhaLivro(props) {
  const controleEditora = new ControleEditora();
  const nomeEditora = controleEditora.getNomeEditora(props.livro.codEditora);
  return (
    <tr>
      <td>{props.livro.titulo}</td>
      <td>{props.livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul>
          {props.livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => props.excluir(props.livro.codigo)}>Excluir</button>
      </td>
    </tr>
  );
}

export default function LivroLista() {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    controle.obterTodos().then((resultado) => setLivros(resultado));
    async function carregarLivros() {
      const controleLivros = new ControleLivros();
      const livros = await controleLivros.obterLivros();
      setLivros(livros);
      setCarregado(true);
    }
    if (!carregado) {
      carregarLivros();
    }
  }, [carregado]);

  const excluir = async (codigo) => {
    const controleLivros = new ControleLivros();
    await controleLivros.excluir(codigo).then(() => setCarregado(false));
  };

  return (
    <main className=''>
      <h1>Catálogo de Livros</h1>
      <table className='table w-100 mx-auto'>
        <thead>
          <tr className='text-light bg-dark'>
            <th>Título</th>
            <th>Resumo</th>
            <th>Editora</th>
            <th>Autores</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro key={index} livro={livro} excluir={excluir} />
          ))}
        </tbody>
      </table>
    </main>
  );
}
