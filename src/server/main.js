import params  from '../../params';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import event from './socket/index.js';

const app = express();

var server = require('http').createServer(app);

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

io.on('connection', (socket) => {
  event(socket)
 })

db.once('open', () => {
  app.emit('ready')
})


 server.listen(params.server.port, function(){
   console.log(`listening on ${params.server.port}`);
 });
