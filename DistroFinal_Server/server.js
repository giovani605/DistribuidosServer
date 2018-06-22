// Servidor
const http = require('http');
const app = require('./app');


const port = 8080;
// cria um servidor no localhost:8080
// o modulo Express vai lidar com os resquest
const server = http.createServer(app);

server.listen(port);
