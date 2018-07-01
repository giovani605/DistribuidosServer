// modulo que cria a middle ware Express que lida com os REST
const express = require('express');

const app = express();
// importa o arquivo de pssagem
const coordenador = require('./api/rotas/principal/coordenadorREST.js');
const bodyParser =  require('body-parser');
app.use(bodyParser.json());
// defino quem lida com essa rota
app.use('/',coordenador);


module.exports = app;
