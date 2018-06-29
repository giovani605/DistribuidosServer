"use strict";

class Passagem {

    constructor() {
        this.id;
        this.data;
        this.origem;
        this.destino;
        this.numero; // numero atual de passagens vendidas
        this.limite; // numero de passagens maxima disponiveis
        this.tipo;
        this.dataVolta;
        this.idade;
        this.cartao;
        this.parcela;
    }
    setid(id) {
        this.id = id;
    }



}


module.exports = Passagem;
