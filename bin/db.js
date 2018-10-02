let mongodb = require('mongodb').MongoClient

class DatabaseHandler {
  
  constructor(config) {
    this.config = config
    
    return this
  }

  connect() {
    if(this.db) return new Promise(this)
    else return new Promise( (resolve, reject) => {
      mongodb.connect(`mongodb://${this.config.host}:${this.config.port}`,
      {useNewUrlParser: true},
      (err, client)=>{
        if(err) reject(this.errorHandler(err));
        else{
          this.client = client;
          this.db = client.db(this.config.database)
          resolve(this)
        }
      })  
    })
  }

  findOne(collection, id) {
    return new Promise((resolve, reject) => {
      let query = { _id: id }
      this.db.collection(collection).findOne(query, (err, result) => {
        if(err) reject(this.errorHandler(err))
        else resolve(result)
      })
    })
  }
  
  find(collection) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).find({}).toArray((err, result) => {
        if(err) reject(this.errorHandler(err))
        else resolve(result)    
      })
    })  
  }
  
  create(collection, object) {
    return new Promise( (resolve, reject) => {
      this.db.collection(collection).insert(object, (err)=>{
        if(err) reject(this.errorHandler(err))
        else resolve()
      })
    })
  }
  
  update(collection, data, id) {
    return new Promise( (resolve, reject) => {
      let query = {_id: id}
      this.db.collection(collection).update(query, { $set:data }, async (err) => {
        if(err) reject(this.errorHandler(err))
        else{  
          let resource = await this.findOne(collection, id)
          resolve(resource)
        }
      })
    })
  }
  
  remove(collection, id) {
    return new Promise((resolve, reject) => {
      let query = {_id: id}
      this.db.collection(collection).deleteOne(query, (err, response) => {
        if(err) reject(this.errorHandler(err))
        else {
          if(response.result.n > 0) resolve(true)
          else resolve(false)
        }
      })
    })
  }
  
  errorHandler(error) {
    
    let response = {
      message: ""
    }
    
    if(error.code === 11000) { response.message = "Index already exists" 
      return response } 
    else if(error.code === 9) { response.message = "Body is empty" 
      return response }
    else { 
      response.message = "unknown error" 
      response.attachment = error
      return response
    }
  }

  get(resource, id) {
    if(id) return this.findOne(resource, id)
    else return this.find(resource)
  }
  
  post(resource, document) { return this.create(resource, document) }
  
  put(resource, document, id) { return this.update(resource, document, id) }
  
  delete(resource, id) { return this.remove(resource, id) }
  
  urlToCollection(url) { return url.replace(/\//g, '_') }

}

module.exports = DatabaseHandler
