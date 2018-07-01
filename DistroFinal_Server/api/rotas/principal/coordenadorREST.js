"use strict";


const express = require('express');
const router = express.Router();
const events =  require('events');
const gerenciador = require('gerenciador/gerenciadorTransacoes.js');
const VariaveisGlobais = require('gerenciador/VariaveisGlobais');
const Evento = VariaveisGlobais.EVENTO;

// criar as rotas aqui

// depois chamar os outros servers para lidar com os requests
// Evento.on('getHotel',(args) => {
//     console.log("chamei um evento");
//     args.status(200).json({
//         "message": "oi"
//     });
// } );



router.get('/hotel', (req, res, next) => {
    // recuperar dados do request
    var id = req.params.id;
    Evento.emit("getHotel",res);
    console.log(Evento.eventNames());
    //var obj = gerenciador.consultar(id);
    // res.status(200).json({
    //   dados: obj
    // });
  
});

module.exports = router;
