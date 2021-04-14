const express = require('express');
const routes = express.Router();

const CepController = require('./controllers/CepController');
const CotacaoController = require('./controllers/CotacaoController');

routes.get('/buscaCEP/:cep', CepController.index);
routes.get('/dataAtual', CepController.dataAtual);
routes.post('/msg', CepController.msgParametrizada);

routes.get('/cotacaoDolar/:dia', CotacaoController.index);

//exporta as rotas para a aplicação
module.exports = routes;