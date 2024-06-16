import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro from '../../../../classes/controle/ControleLivros';

const controleLivro = new ControleLivro();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const livros = await controleLivro.obterLivros();
      res.status(200).json(livros);
    } else if (req.method === 'POST') {
      const livro = req.body;
      controleLivro.incluir(livro);
      res.status(200).json({ message: 'Livro incluído com sucesso.' });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Método ${req.method} não permitido.` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Erro interno do servidor: ${err}` });
  }
}
