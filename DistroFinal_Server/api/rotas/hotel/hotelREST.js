// esse arquivo lida com os requests nas passagens
"use strict";
const express = require('express');
const router = express.Router();
const gerenciador = require('./GerenciadorHotel.js');
const Passagem = require('./hotelClass');

// aqui eu vou linda com os get request
var cont = 0;



router.get('/:id', (req, res, next) => {
  // recuperar dados do request
  var id = req.params.id;
  var obj = gerenciador.consultar(id);
  res.status(200).json({
    dados: obj
  });

});


// recupera uma lista com todas as passagens disponiveis
router.get('/', (req, res, next) => {
  var checkin = req.param("checkin")
  if (checkin == "")
    checkin = null;
  var checkout = req.param("checkout")
  if (checkout == "")
    checkout = null;
  var local = req.param("local")
  if (local == "")
    local = null;
  var a = gerenciador.filtrar(checkin,checkout,local);
  res.status(200).json({
    dados: a
  });
  return;
});


function testarDadosCompra(cartao, parcela, qtdQuartos) {
  if (cartao == null) {
    return false;
  }
  if (parcela == null) {
    return false;
  }
  if (qtdQuartos == null) {
    return false;
  }

  return true;
}

// aqui o cliente quer comprar a passagem
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  // extrair variaveis que vem no body
  let qtdQuartos = req.body.qtdQuartos;
  let cartao = req.body.cartao;
  let parcela = req.body.parcela;

  if (!testarDadosCompra(cartao, parcela, qtdQuartos)) {
    res.status(200).json({
      message: 'dados invalidos'
    });
    return;
  }
  if (gerenciador.comprar(id, cartao, parcela, qtdQuartos)) {
    res.status(200).json({
      message: 'Quarto reservado com sucesso'
    });
  } else {
    res.status(200).json({
      message: 'quartos não disponíveis'
    });
  }
});



module.exports = router;
