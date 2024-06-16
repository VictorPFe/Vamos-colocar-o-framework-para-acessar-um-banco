const mongoose = require('./conexao');
const { Schema } = mongoose;

const LivroSchema = new Schema({
  titulo: String,
  autor: String,
  ano: Number
});

const Livro = mongoose.model('Livro', LivroSchema, 'livros');

module.exports = Livro;
