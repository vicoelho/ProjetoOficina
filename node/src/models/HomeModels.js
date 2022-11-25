const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  email: { type: String, require: true },
  senha: { type: String, require: true },
  nome: { type: String, require: true },
  data_nascimento: { type: Date, require: true },
  sexo: { type: String, require: true },
  celular: { type: String, require: true },
  carro: { type: Boolean, require: true },
  cnh: String,
  marca: String,
  modelo: String,
  placa: String,
  capacidade: Number,
  avaliacoes: Array, //Lista de avaliações vinculadas ao usuário - Média
});

const HomeModel = mongoose.model('Usuario', HomeSchema);

class Home{

};

module.exports = HomeModel;