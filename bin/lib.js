let db = require('./db')

findOne = (collection, identifier, id) => {
  
  return new Promise((resolve, reject) => {

    let query = {}
    query[identifier] = id

    db.get().collection(collection).findOne(query, { fields: { _id: 0 } }, (err, result) => {
      
      if(err) reject(err)
      
      else resolve(result)
 
    })
  
  })
  
}
 
find = (collection) => {
  
  return new Promise((resolve, reject) => {
    
    db.get().collection(collection).find({}, { fields: { _id: 0 } }).toArray((err, result) => {
      
      if(err) reject(err)
      
      else resolve(result)    

    })
     
  })  

}

create = (collection, object) => {
  
  return new Promise( (resolve, reject) => {
  
    db.get().collection(collection).insert(object, (err)=>{

      
      if(err) reject(errorHandler(err))
      else resolve(object)
      
    })
    
  })
  
}

update = (collection, data, identifier, id) => {

  return new Promise( (resolve, reject) => {
    
    let query = {}
    query[identifier] = id

    db.get().collection(collection).update(query, { $set:data }, async (err) => {
      
      if(err) reject(errorHandler(err))
      
      else{  
        let resource = await findOne(collection, id)
        resolve(resource)
      }
    
    })

  })

}

remove = (collection, identifier, id) => {

  return new Promise((resolve, reject) => {
    
    let query = {}
    query[identifier] = id

    db.get().collection(collection).deleteOne(query, (err, response) => {
      
      if(err) reject(err)
      
      else {
        if(response.result.n > 0) resolve(true)
        else resolve(false)
      }
        
    })
      
  })

}

errorHandler = (error) => {
  
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



exports.get = (resource, identifier ,id) => {
  
  if(id) return findOne(resource, identifier, id)

  else return find(resource)

}

exports.post = (resource, document) => create(resource, document)
exports.put = (resource, document, identifier, id) => update(resource, document, identifier, id)
exports.delete = (resource, identifier, id) => remove(resource, identifier, id)

exports.listEndPoints = () => find("restAtHome")

exports.urlToCollection = (url) => url.replace(/\//g, '_')

exports.parseConfig = () => {
  //sync is ok as config is read once.
  let raw = require('fs').readFileSync('/etc/restAtHome/config')
  return JSON.parse(raw)
}