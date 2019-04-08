const params = {
  server: {
     host: '127.0.0.1'
   , port: 5000
   , get url(){ return 'http://' + this.host + ':' + this.port } 
  },
  db: {
    dbName: 'mongodb',
    dbPort: 27017,
    dbHost: '127.0.0.1'
  }
}

module.exports = params

