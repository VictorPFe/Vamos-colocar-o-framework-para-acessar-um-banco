const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/livraria');

module.exports = mongoose;
