// esse arquivo lida com os requests nas passagens
"use strict";
const express = require('express');
const router = express.Router();
const gerenciador = require('./GerenciadorPassagem.js');
const Passagem = require('./ClassPassagem');

// aqui eu vou linda com os get request
var cont = 0;

function extrairDados(body){
  var pass = new Passagem();
  pass.data = body.data;
  pass.origem = body.origem;
  pass.destino =  body.destino;
  pass.numero = body.numero;
  pass.tipo = body.tipo;
  return pass;
}

router.get('/:id', (req,res,next) => {
  // recuperar dados do request
  // console.log(req);
  var id = req.params.id;
  var obj = gerenciador.consultar(id);
  res.status(200).json({
    dados:obj
  });

});


// recupera uma lista com todas as passagens disponiveis
router.get('/', (req,res,next) => {
	var data = req.body.data
	var origem = req.body.origem
	var destino = req.body.destino
	
	data = "hj"
  var a = gerenciador.filtrar(data, destino, origem);
  res.status(200).json({
	  mensagem: "teste",
    dados: a
  });
  return;
});


function testarDadosCompra(cartao,parcela,idade){
  if(cartao == null){
    return false;
  }
  if(idade == null){
    return false;
  }
  if(parcela == null){
    return false;
  }

  return true;
}

// aqui o cliente quer comprar a passagem
router.post('/:id', (req,res,next) =>{
  var id = req.params.id;
  // extrair variaveis que vem no body
  let cartao = req.body.cartao;
  let parcela = req.body.parcela;
  let idade = req.body.idade;

  if(!testarDadosCompra(cartao,parcela,idade)){
    res.status(200).json({
      message:'dados invalidos'
    });
    return;
  }
  console.log("dsadsa");
  if(gerenciador.comprar(id,cartao,parcela,idade)){
    res.status(200).json({
      message:'comprada com sucesso'
    });
  }else{
    res.status(200).json({
      message:'passagem nao disponivel'
    });
  }
});



module.exports = router;
