import { useState, useEffect } from "react";
import ControleEditora from "../classes/controle/ControleEditora";
import Livro from "../classes/modelo/Livro";

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codLivro: number) => void;
}

const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
  const [nomeEditora, setNomeEditora] = useState<string>("");
  
  useEffect(() => {
    async function fetchEditoraName() {
      const nome = await controleEditora.getNomeEditora(livro.codEditora);
      if (nome) {
        setNomeEditora(nome);
      }
    }

    fetchEditoraName();
  }, [livro.codEditora]);

  return (
    <tr key={livro.codigo}>
      <td>{livro.codigo}</td>
      <td>{livro.titulo}</td>
      <td>
        {nomeEditora ? nomeEditora : "Nenhuma Editora encontrada"}
      </td>
      <td>{livro.resumo}</td>
      <td>
        <ul>
        {livros.map((livro, index) => (
        <LinhaLivro
          key={index}
          livro={livro}
          excluir={() => excluir(livro.codigo)}
    />
    ))}
        </ul>
      </td>
      <td>
        <button onClick={() => excluir(livro.codigo)} className="btn btn-danger">
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default LinhaLivro;
