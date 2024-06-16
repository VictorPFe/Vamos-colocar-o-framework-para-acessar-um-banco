import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro from '../../../../classes/controle/ControleLivros';

const controleLivro = new ControleLivro();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const codigo = Number(req.query.codigo);
      const livro = controleLivro.obterLivros().find(livro => livro.codigo === codigo);
      if (livro) {
        res.status(200).json(livro);
      } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
      }
    } else if (req.method === 'DELETE') {
      const codigo = Number(req.query.codigo);
      controleLivro.excluir(codigo);
      res.status(200).json({ message: 'Livro excluído com sucesso.' });
    } else {
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).json({ message: `Método ${req.method} não permitido.` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Erro interno do servidor: ${err}` });
  }
}
