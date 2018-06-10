let lib = require('./lib')
let endpoints

findEndpoint = (path) => {
  
  if(path.endsWith('/')) path = path.substring(0, path.length - 1)
  
  for(let i = 0; i < endpoints.length; i++){
    if(endpoints[i]._id === path) return endpoints[i]
  }

  return null

}



exports.initEndpoints = (ends, application, handlers) => {
  
  endpoints = ends

  for(let i = 0; i < endpoints.length; i++) {
    
    let endpoint = endpoints[i]
    
    if(endpoint.methods.includes('GET')) {
       
      application.get(endpoint._id, handlers.getHandler)
      application.get(endpoint._id + "/:ID", handlers.getHandler)
    
    }
    
    if(endpoint.methods.includes('POST')) {
      
       application.post(endpoint._id, handlers.postHandler)
    
    }

    if(endpoint.methods.includes('PUT')) {
      
      application.put(endpoint._id + "/:ID", handlers.putHandler)
    
    }
    
    if(endpoint.methods.includes('DELETE')) {
      
      application.delete(endpoint._id + "/:ID", handlers.deleteHandler)
      
    }
  
  }

}


exports.handlers = {
  
  getHandler: async (req, res) => {
      
    try { 
      let endpoint = findEndpoint(req.url.replace(`/${req.params.ID}`,""))
      let collection = lib.urlToCollection(endpoint._id)
      let resource = await lib.get(collection, endpoint.identifier, req.params.ID)
      if(resource === null) return res.sendStatus(404)
      res.send(resource)
    } catch(error) {
      res.status(400).send(error)
    }

  },

  postHandler: async (req, res) => {
    
    try {
      let endpoint = findEndpoint(req.url)
      let collection = lib.urlToCollection(endpoint._id)
      let resource = await lib.post(collection, req.body)
      res.send(resource)
    } catch(error) {
      res.status(400).send(error)
    }

  },
  
  putHandler: async (req, res) =>  {
    
    try {
      let endpoint = findEndpoint(req.url.replace(`/${req.params.ID}`,""))
      let collection = lib.urlToCollection(endpoint._id)
      let resource = await lib.put(collection, req.body, endpoint.identifier, req.params.ID)
      if(resource === null) return res.sendStatus(404)
      res.send(resource)
    } catch(error) {
      res.status(400).send(error)
    }
  
  },

  deleteHandler: async (req, res) => {
    
    try {
      let endpoint = findEndpoint(req.url.replace(`/${req.params.ID}`,""))
      let collection = lib.urlToCollection(endpoint._id)
      let deleted = await lib.delete(collection, endpoint.identifier, req.params.ID)
      if(deleted) return res.sendStatus(200)
      else return res.sendStatus(404)
    } catch(error) {
      res.status(400).send(error)
    }
  
  }
}

exports.rootController = async (req, res) => {
  
  try {
    let paths = await lib.listEndPoints();
    res.send(paths)
  } catch(error) {
    res.send(error)
  }
}