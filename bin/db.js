let mongodb = require('mongodb').MongoClient

let connection = {
  client: null,
  db: null
}

exports.connect = (config) => {
  if(connection.db !== null) return new Promise(connection.db)
  return new Promise((resolve, reject) =>{
    mongodb.connect(`mongodb://${config.host}:${config.port}`,(err, client)=>{
    
      if(err) reject(err);
      else{

        connection.client = client;
        connection.db = client.db(config.database)
        resolve()

      }
    })
  })  
}

exports.getEndpoints = () =>{
  return new Promise((resolve, reject) =>{
    this.get().collection('restAtHome').find().toArray((err, ends) =>{
      if(err) reject(err)
      else resolve(ends)
    })
  })
}

exports.get = () => connection.db
exports.close = () => connection.client.close()