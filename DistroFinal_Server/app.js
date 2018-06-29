// modulo que cria a middle ware Express que lida com os REST
const express = require('express');

const app = express();
// importa o arquivo de pssagem
const passagens = require('./api/rotas/passagem/passagemREST.js');
const hotel = require('./api/rotas/hotel/hotelREST.js');
const bodyParser =  require('body-parser');
app.use(bodyParser.json());
// defino quem lida com essa rota
app.use('/passagem',passagens);
app.use('/hotel',hotel);

module.exports = app;
