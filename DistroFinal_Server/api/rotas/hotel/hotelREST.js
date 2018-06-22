// esse arquivo lida com os requests nas passagens
"use strict";
const express = require('express');
const router = express.Router();
const gerenciador = require('./GerenciadorHotel.js');
const Passagem = require('./hotelClass');

// aqui eu vou linda com os get request
var cont = 0;



router.get('/:id', (req,res,next) => {
  // recuperar dados do request
  //  console.log(req);
  var id = req.params.id;
  var obj = gerenciador.consultar(id);
  res.status(200).json({
    dados:obj
  });

});


// recupera uma lista com todas as passagens disponiveis
router.get('/', (req,res,next) => {
  var a = gerenciador.listar();
  res.status(200).json({
    dados: a
  });
  return;
});


function testarDadosCompra(cartao,parcela,idade,datasaida,qtdQuartos){
  if(cartao == null){
    return false;
  }
  if(idade == null){
    return false;
  }
  if(parcela == null){
    return false;
  }
  if(datasaida == null){
    return false;
  }
  if(qtdQuartos == null){
    return false;
  }

  return true;
}

// aqui o cliente quer comprar a passagem
router.post('/:id', (req,res,next) =>{
  var id = req.params.id;
  // extrair variaveis que vem no body
  let datasaida = req.body.dataSaida;
  let qtdQuartos = req.body.qtdQuartos;
  let cartao = req.body.cartao;
  let parcela = req.body.parcela;
  let idade = req.body.idade;

  if(!testarDadosCompra(cartao,parcela,idade,datasaida,qtdQuartos)){
    res.status(200).json({
      message:'dados invalidos'
    });
    return;
  }
  console.log("dsadsa");
  if(gerenciador.comprar(id,cartao,parcela,idade,datasaida,qtdQuartos)){
    res.status(200).json({
      message:'comprada com sucesso'
    });
  }else{
    res.status(200).json({
      message:'quarto nao disponivel'
    });
  }
});



module.exports = router;
