// esse Modulo controla as passagens

// cria uma mapa que tem as passagens
"use strict";
var mapa = new Map();
const Hotel = require('./hotelClass');
var cont = 0;
criarDados();

function criarDados() {
  mapa.set(cont + "", cria(cont, 'hj','amanha', 'curitiba', 20));
  mapa.set(cont + "", cria(cont, 'hj','amanha', 'curitiba', 20));
  mapa.set(cont + "", cria(cont, 'hj','amanha', 'cornelio', 20));
  mapa.set(cont + "", cria(cont, '30','amanha', 'cornelio', 20));
  mapa.set(cont + "", cria(cont, '20','amanha', 'cornelio', 20));
}

function cria(id, checkin, checkout, local, limite) {
  var pass = new Hotel();
  pass.id = id;
  pass.checkin = checkin;
  pass.checkout = checkout;
  pass.local = local;
  pass.numero = 0;
  pass.limite = limite;
  pass.comprada = false;
  cont++;
  return pass;
}
// essa funcao testa se a passagem eh valida
function consultarHotel(id) {
  return mapa.get(id);
}
// retorna um mapa das passagens cadastradas
function listarHotel() {
  if (mapa.size == 0) {
    return;
  }
  var lista = [];
  for (let a of mapa.values()) {
    lista.push(a);
  }
  return lista;
}
// tenta comprar um hotel
function comprar(id, cartao, parcela, qtdPessoas) {
  var hotel = consultarHotel(id);
  if (hotel == null) {
    return false;
  }
  if (testeCompra(hotel, qtdPessoas)) {
    efetivarCompra(hotel, qtdPessoas, cartao, parcela);
    return true;
  }
  return false;
}
// se a comprar for possivel efetivar
function efetivarCompra(hotel, qtdPessoas, cartao, parcela) {
  hotel.numero += qtdPessoas;
  hotel.cartao = cartao;
  hotel.parcela = parcela;
}
// testa se a compra é possivel
function testeCompra(hotel, qtdPessoas) {
  if (hotel.numero + qtdPessoas > hotel.limite) {
    return false;
  }
  return true;
}

// retorna true ou false para fazer o filtro das passagens
function espec(hotel, checkin, checkout, local) {
  if (checkin != null) {
    if (hotel.checkin != checkin) {
      return false;
    }
  }
  if (checkout != null) {
    if (hotel.checkout != checkout) {
      return false;
    }
  }
  if (local != null) {
    if (hotel.local !== local) {
      return false;
    }
  }
  return true;

}

// filtra as passagens pelos parametros
function filtrar(checkin, checkout, local) {
  if (checkin == null && checkout == null && local == null)
    return listarHotel();

  lista = [];
  if (mapa.size == 0) {
    return;
  }
  var lista = [];
  for (let a of mapa.values()) {
    if (espec(a, checkin, checkout, local))
      lista.push(a);
  }


  return lista;
}

exports.comprar = comprar;
exports.consultar = consultarHotel;
exports.listar = listarHotel;
exports.filtrar = filtrar;
