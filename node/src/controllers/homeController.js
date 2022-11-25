const HomeModel = require('../models/HomeModels');

//FAZER INSERT NA TABELA
//HomeModel.create({
//  email: '',
//  senha: '',
//  nome: '',
//  data_nascimento: '',
//  sexo: '',
//  celular: '',
//  carro: '',
//  cnh: '',
//  marca: '',
//  modelo: '',
//  placa: '',
//  capacidade: '',
//  avaliacoes: '', //Lista de avaliações vinculadas ao usuário - Média
//})
//.then(dados => console.log(dados))
//.catch(e => console.log(e));

//FAZER A CONSULTA
//HomeModel.find()
//.then(dados => console.log(dados))
//.catch(e => console.log(e));

exports.paginaInicial = (req, res) => {
    res.render('index');
};

exports.tratarPost = (req, res) => {
    console.log(req.body)
    res.send(req.body);
};