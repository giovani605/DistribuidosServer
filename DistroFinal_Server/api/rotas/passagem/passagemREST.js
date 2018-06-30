// esse arquivo lida com os requests nas passagens
"use strict";
const express = require('express');
const router = express.Router();
const gerenciador = require('./GerenciadorPassagem.js');
const Passagem = require('./ClassPassagem');
const Logger = require('Logger/Logger.js');
const log = new Logger('log.txt');
log.addLog("iniciei o logger");


var cont = 0;

// lido com get em passagens especificas
router.get('/:id', (req, res, next) => {
  // recuperar dados do request
  // console.log(req);
  var id = req.params.id;
  var obj = gerenciador.consultar(id);
  res.status(200).json({
    dados: obj
  });

});


// recupera uma lista com todas as passagens disponiveis com filtro
router.get('/', (req, res, next) => {
  var data = req.param("data");
  if (data == "")
    data = null;
  var origem = req.param("origem")
  if (origem == "")
    origem = null;
  var destino = req.param("destino")
  if (destino == "")
    destino = null;
  var opcao = req.param("opcao")
  if (opcao == "")
    opcao = null;
  var dataVolta = req.param("dataVolta")
  if (dataVolta == "")
    dataVolta = null;
  var a = gerenciador.filtrar(data, destino, origem, opcao, dataVolta);
  res.status(200).json({
    dados: a
  });
  return;
});

// o usuario digitou todos os dados?
function testarDadosCompra(cartao, parcela, idade, numeroPessoas) {
  if (numeroPessoas == null || numeroPessoas <= 0) {
    return false;
  }
  if (cartao == null) {
    return false;
  }
  if (idade == null) {
    return false;
  }
  if (parcela == null) {
    return false;
  }
  return true;
}

// aqui o cliente quer comprar a passagem
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  // extrair variaveis que vem no body
  let numeroPessoas = req.body.numeroPessoas;
  if (numeroPessoas == "")
    numeroPessoas = null;
  let cartao = req.body.cartao;
  if (cartao == "")
    cartao = null;
  let parcela = req.body.parcela;
  if (parcela == "")
    parcela = null;
  let idade = req.body.idade;
  if (idade == "")
    idade = null;

  if (!testarDadosCompra(cartao, parcela, idade, numeroPessoas)) {
    res.status(200).json({
      message: 'dados invalidos'
    });
    return;
  }
  if (gerenciador.comprar(id, cartao, parcela, idade, numeroPessoas)) {
    res.status(200).json({
      message: 'passagem comprada com sucesso'
    });
  } else {
    res.status(200).json({
      message: 'passagem não disponivel'
    });
  }
});



module.exports = router;
