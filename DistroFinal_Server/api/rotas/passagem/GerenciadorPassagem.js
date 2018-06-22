// esse Modulo controla as passagens

// cria uma mapa que tem as passagens
"use strict";
var mapa = new Map();
const Passagem = require('./ClassPassagem');
var cont = 0;
criarDados();

function criarDados(){
  mapa.set(cont+"",cria(cont,'hj', 'curitiba', 'LONGE',400,'ida'));
  mapa.set(cont+"",cria(cont,'hj', 'curitiba', 'LONGE',100,'ida'));
}

function cria(id,data_inicio,origem,destino,numero,tipo){
  var pass = new Passagem();
  pass.id = id;
  pass.data = data_inicio;
  pass.origem = origem;
  pass.destino =  destino;
  pass.numero = numero;
  pass.tipo = tipo;
  pass.comprada = false;
  cont++;
  return pass;
}
// essa funcao testa se a passagem eh valida
function consultarPassagem(id){
  return mapa.get(id);
}
// retorna um mapa das passagens cadastradas
function listarPassagem(){
  if(mapa.size == 0){
    return;
  }
  var lista = [];
  for(let a of mapa.values()){
    lista.push(a);
  }
  return lista;
}
function comprar(id,cartao,parcela,idade){
  var pass = consultarPassagem(id);
  if(pass.comprada == true){
    return false;
  }
  pass.comprada = true;
  pass.cartao = cartao;
  pass.parcela = parcela;
  pass.idade = idade;
  return true;
}

// retorna true ou false
function espec(pass,data, destino, origem){
	console.log(pass);
	if(data != null){
		if(pass.data != data){
			return false;
		}
	}
	console.log("passei data");
	console.log(destino);
	if(destino != null){
		if(pass.destino !== destino){
			return false;
		}
	}
	console.log("passei destino");
	if(origem != null){
		if(pass.origem != origem){
			return false;
		}
	}
	console.log("passei origem")
	return true;
	
}

function filtrar(data, destino, origem) {
	if(data == null && destino == null && origem == null)
		return listarPassagem()
	
	lista = [];
	 if(mapa.size == 0){
		    return;
	 }
	 var lista = [];
	 for(let a of mapa.values()){
		 if(espec(a,data,destino,origem))
		  lista.push(a);
	}
	
	
	return lista;
}

exports.comprar = comprar;
exports.consultar = consultarPassagem;
exports.listar = listarPassagem;
exports.filtrar = filtrar;

// codigo antigo
// function criarPassagem(passagem) {
// if(testarPassagem(passagem)){
// salvar(passagem);
// console.log("salvei a passagem");
// return true;
// }
// else{
// return false;
// }
// }
// function salvar(passagem){
// // criar um id
// console.log(passagem);
// let id = cont;
// passagem.id = id;
// // add no map
// mapa.set(id,passagem);
// cont++;
// listarPassagem();
// }
// function testarPassagem(passagem){
// if(mapa.size == 0){
// return true;
// }
// for(var a of mapa.values()){
// console.log(a);
// if(a.data == passagem.data &&
// a.origem == passagem.origem &&
// a.destino == passagem.destino &&
// a.numero == passagem.numero){
// return false;
// }
// }
// return true;
// }
