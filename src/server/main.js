// const bodyParser = require('body-parser');
// const params = require('../../params');
// const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const server = require('http').createServer(app);
// // const PieceController = require('./controllers/Piece.controller');

// app.use(cors());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));

// global.io = require('socket.io')(server);

// mongoose.Promise = global.Promise

// mongoose.connect(`mongodb://${params.db.dbHost}:${params.db.dbPort}/?gssapiServiceName=${params.db.dbName}`)

// const db = mongoose.connection

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Connectiong to DB established!');
// });

// app.listen(params.server.port, () => {
//   console.log(`Server is listeninig on ${params.server.port}`);
// });

// let test = PieceController.createPiece();
// console.log(test)
// import params  from '../../params';

// import cors from 'cors'
// import express from 'express'
// import mongoose from 'mongoose'
// import bodyParser from 'body-parser'
// import event from './event/index.js'

const bodyParser = require('body-parser');
const params = require('../../params');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

var server = require('http').createServer(app);


const env = process.env.NODE_ENV || 'development'
const config = params
require("babel-core/register");
require("babel-polyfill");

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
global.io = require('socket.io')(server)
mongoose.Promise = global.Promise

mongoose.connect(`mongodb://${params.db.dbHost}:${params.db.dbPort}/?gssapiServiceName=${params.db.dbName}`)

const db = mongoose.connection
db.on('error', err => {
  console.log('FAILED TO CONNECT', err)
  process.exit(1)
})

app.get('/',(req, res) => res.end())

// io.on('connection', (socket) => {
//   event(socket)
//  })

db.once('open', () => {
  //app.listen(config.server.port)
  app.emit('ready')
//  console.log(`App is running and listening to port ${config.server.port}`)
})


 server.listen(5000, function(){
   console.log('listening on 5000');
 });
