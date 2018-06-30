"use strict";
class Hotel {

    constructor() {
        this.id;
        this.checkin;
        this.checkout;
        this.local;
        this.limite;
        this.numero;
        this.comprada;
        this.dataSaida;
        this.qtdQuartos;
        this.idade;
        this.cartao;
        this.parcela;
    }
    setid(id) {
        this.id = id;
    }
}
module.exports = Hotel;
