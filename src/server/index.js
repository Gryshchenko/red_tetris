const params = require('../../params');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const server = require('http').createServer(app);

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
})

// const logerror = debug('tetris:error')
//   , loginfo = debug('tetris:info')

// const initApp = (app, params, cb) => {
//   const {host, port} = params
//   const handler = (req, res) => {
//     const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
//     fs.readFile(__dirname + file, (err, data) => {
//       if (err) {
//         logerror(err)
//         res.writeHead(500)
//         return res.end('Error loading index.html')
//       }
//       res.writeHead(200)
//       res.end(data)
//     })
//   }

//   app.on('request', handler)

//   app.listen({host, port}, () =>{
//     loginfo(`tetris listen on ${params.url}`)
//     cb()
//   })
// }

// const initEngine = io => {
//   io.on('connection', function(socket){
//     loginfo("Socket connected: " + socket.id)
//     socket.on('action', (action) => {
//       if(action.type === 'server/ping'){
//         socket.emit('action', {type: 'pong'})
//       }
//     })
//   })
// }

// export function create(params){
//   const promise = new Promise( (resolve, reject) => {
//     const app = express();
//     initApp(app, params, () =>{
//       const io = require('socket.io')(app)
//       const stop = (cb) => {
//         io.close()
//         app.close( () => {
//           app.unref()
//         })
//         loginfo(`Engine stopped.`)
//         cb()
//       }

//       initEngine(io)
//       resolve({stop})
//     })
//   })
//   return promise
// }
