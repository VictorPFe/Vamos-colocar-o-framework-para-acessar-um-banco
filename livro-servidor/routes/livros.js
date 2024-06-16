const express = require('express');
const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');
const router = express.Router();

router.get('/', async (req, res) => {
  const livros = await obterLivros();
  res.json(livros);
});

router.post('/', async (req, res) => {
  const livro = req.body;
  try {
    await incluir(livro);
    res.json({ message: 'Livro incluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao incluir livro!' });
  }
});

router.delete('/:id', async (req, res) => {
  const codigo = req.params.id;
  try {
    await excluir(codigo);
    res.json({ message: 'Livro excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir livro!' });
  }
});

module.exports = router;
