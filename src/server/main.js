import params  from '../../params';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import event from './socket/index.js';

require("babel-core/register");
require("babel-polyfill");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const app = express();

const server = require('http').createServer(app);

global.io = require('socket.io')(server);
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${params.db.dbHost}:${params.db.dbPort}/${params.db.dbName}`, { useNewUrlParser: true });

const db = mongoose.connection;

app.get('/',(req, res) => res.end());

io.on('connection', (socket) => {
  event(socket);
 });

db.once('open', () => {
  app.emit('ready');
});


server.listen(params.server.port, async () => {
  console.log(`listening on ${params.server.port}`);
});
