const params = require('../../params');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PieceController = require('./controllers/Piece.controller');

global.io = require('socket.io')(server);

mongoose.Promise = global.Promise

mongoose.connect(`mongodb://${params.db.dbHost}:${params.db.dbPort}/?gssapiServiceName=${params.db.dbName}`)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connectiong to DB established!');
});

app.listen(params.server.port, () => {
  console.log(`Server is listeninig on ${params.server.port}`);
});

// let test = PieceController.createPiece();
// console.log(test)