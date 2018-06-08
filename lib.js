findOne = (collection, id) => {
  
  return new Promise((resolve, reject) => {
    
    db.get().collection(collection).findOne({_id: id}, (err, result) => {
      
      if(err) reject(err)
      
      else resolve(result)
 
    })
  
  })
  
}

find = (collection) => {
  
  return new Promise((resolve, reject) => {
    
    db.get().collection(collection).find({},(err, result) => {
      
      if(err) reject(err)
      
      else resolve(result)    

    })
     
  })  

}

create = (collection, object) => {
  
  return new Promise( (resolve, reject) => {
  
    db.get().collection(collection).insert(object,(err)=>{
      
      if(err) reject(err)
      
      else resolve(object)
      
    })
    
  })
  
}

update = (collection, data, id) => {

  return new Promise( (resolve, reject) => {
    
    db.get().collection(collection).update({
      _id: id
    },{
      $set:data
    },async(err) => {
      
      if(err) reject(err)
      
      else{  
        let resource = await findOne(collection, id)
        resolve(resource)
      }
    
    })

  })

}

remove = (collection, id) => {

  return new Promise((resolve, reject) => {
    
    db.get().collection(collection).remove({
      _id: id
    },(err) => {
      
      if(err) reject(err)
      
      else resolve()
    
    })
      
  })

}

exports.get = (resource, id) => {
  console.log(resource, id)
  if(id) return findOne(resource, id)

  else return find(resource)

}

exports.post = (resource, document) => create(resource, document)
exports.put = (resource, document, id) => update(resouce, document, id)
exports.delete = (resource, id) => remove(resouce, id)

