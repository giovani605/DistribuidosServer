// esse Modulo controla as passagens

// cria uma mapa que tem as passagens
"use strict";
var mapa = new Map();
const Passagem = require('./ClassPassagem');
var cont = 0;
criarDados();

function criarDados(){
  mapa.set(cont+"",cria(cont,'hj', 'cornelio', 'LONGE',20,'ida','nda'));
  mapa.set(cont+"",cria(cont,'hj', 'curitiba', 'LONGE',20,'ida e volta','nda'));
}

function cria(id,data_inicio,origem,destino,limite,tipo,data_volta){
  var pass = new Passagem();
  pass.id = id;
  pass.data = data_inicio;
  pass.origem = origem;
  pass.destino =  destino;
  pass.numero = 0;
  pass.tipo = tipo;
	pass.limite = limite;
	pass.dataVolta = data_volta;
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
function comprar(id,cartao,parcela,idade,qtdPessoas){
	var pass = consultarPassagem(id);
	if(pass == null){
		return false;
	}
  if(testeCompra(pass,qtdPessoas)){
		efetivarCompra(pass,qtdPessoas,cartao,parcela,idade);
		return true;
	}
  return false;
}
function 	efetivarCompra(pass,qtdPessoas,cartao,parcela,idade){
	pass.numero += qtdPessoas;
	pass.cartao = cartao;
  pass.parcela = parcela;
  pass.idade = idade;
}
function testeCompra(pass,qtdPessoas){
	if(pass.numero + qtdPessoas > pass.limite){
    return false;
	}
	return true;
}

// retorna true ou false
function espec(pass,data, destino, origem,opcao,data_volta){
	if(data != null){
		if(pass.data != data){
			return false;
		}
	}
	if(destino != null){
		if(pass.destino !== destino){
			return false;
		}
	}
	if(origem != null){
		if(pass.origem != origem){
			return false;
		}
	}
	if(opcao != null){
		if(pass.tipo != opcao){
			return false;
		}
	}
	if(data_volta != null){
		if(pass.dataVolta != data_volta){
			return false;
		}
	}
	return true;
	
}

function filtrar(data, destino, origem,opcao,dataVolta) {
	if(data == null && destino == null && origem == null && opcao == null)
		return listarPassagem()
	
	lista = [];
	 if(mapa.size == 0){
		    return;
	 }
	 var lista = [];
	 for(let a of mapa.values()){
		 if(espec(a,data,destino,origem,opcao,dataVolta))
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
