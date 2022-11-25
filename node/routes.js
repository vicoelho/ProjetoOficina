const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');

function meuMiddleware(req, res, next) {
    req.session = {nome: '', sobrenome: ''};
    console.log();
    console.log("Passei pelo seu middleware");
    console.log();
    next();
}

//ROTAS DA HOME
route.get('/', homeController.paginaInicial);
route.post('/', homeController.tratarPost);

module.exports = route;