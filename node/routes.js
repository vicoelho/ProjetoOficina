const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const cadastroController = require('./src/controllers/cadastroController');
const perfilController = require('./src/controllers/perfilController');
const caronasController = require('./src/controllers/caronasController');
const criarController = require('./src/controllers/criarController');
const detalhesController = require('./src/controllers/detalhesController');
const {loginRequired} = require('./src/middlewares/middlewares');

//ROTAS DA HOME
route.get('/', homeController.index);

//ROTAS DE LOGIN
route.get('/login/index', cadastroController.index_login);
route.post('/login/login', cadastroController.login);
route.get('/login/logout', cadastroController.logout);

//ROTAS DE CADASTRO DE USUÁRIOS
route.get('/cadastro/index', cadastroController.index);
route.post('/cadastro/cadastro', cadastroController.cadastro);

//ROTAS DE PERFIL
route.get('/perfil/index', loginRequired, perfilController.index);
route.get('/perfil/index/:id', loginRequired, perfilController.profile);

//ROTAS DE LISTA DE CORRIDAS
route.get('/caronas/index', loginRequired, caronasController.index);

//ROTAS DE CRIAR CORRIDAS
route.get('/criar/index', loginRequired, criarController.index);
route.post('/criar/criar', criarController.criar);

//ROTAS DE DETALHES CORRIDAS
route.get('/detalhes/index', loginRequired, detalhesController.index);
route.get('/detalhes/index/:id', loginRequired, detalhesController.profile);
route.post('/detalhes/entrar/:id', loginRequired, detalhesController.join);

module.exports = route;