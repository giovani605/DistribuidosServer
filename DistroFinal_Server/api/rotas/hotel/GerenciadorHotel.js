// esse Modulo controla as passagens

// cria uma mapa que tem as passagens
"use strict";
var mapa = new Map();
const Hotel = require('./hotelClass');
var cont = 0;
criarDados();

function criarDados(){
  mapa.set(cont+"",cria(cont,'hj', 'curitiba',400));
  mapa.set(cont+"",cria(cont, 'hj','curitiba',100));
  mapa.set(cont+"",cria(cont, 'hj','cornelio',200));
  mapa.set(cont+"",cria(cont, '30','cornelio',300));
  mapa.set(cont+"",cria(cont, '20','cornelio',300));
}

function cria(id,data_inicio,local,numero){
  var pass = new Hotel();
  pass.id = id;
  pass.data = data_inicio;
  pass.local = local;
  pass.numero = numero;
  pass.comprada = false;
  cont++;
  return pass;
}
// essa funcao testa se a passagem eh valida
function consultarHotel(id){
  return mapa.get(id);
}
// retorna um mapa das passagens cadastradas
function listarHotel(){
  if(mapa.size == 0){
    return;
  }
  var lista = [];
  for(let a of mapa.values()){
    lista.push(a);
  }
  return lista;
}
function comprar(id,cartao,parcela,idade,datasaida,qtdQuartos){
  var pass = consultarHotel(id);
  if(pass.comprada == true){
    return false;
  }
  pass.comprada = true;
  pass.cartao = cartao;
  pass.parcela = parcela;
  pass.idade = idade;
  pass.dataSaida = datasaida;
  pass.qtdQuartos = qtdQuartos;
  return true;
}

exports.comprar = comprar;
exports.consultar = consultarHotel;
exports.listar = listarHotel;
