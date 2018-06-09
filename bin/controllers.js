let lib = require('./lib')
let endpoints

findEndpoint = (path) => {
  
  for(let i = 0; i < endpoints.length; i++){
    if(endpoints[i]._id === path) return endpoints[i]
  }

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
    
    let endpoint = findEndpoint(req.url.replace(`/${req.params.ID}`,""))
    
    try { 
      let resource = await lib.get(endpoint.resource, req.params.ID)
      res.send(resource)
    } catch(error) {
      res.status(400).send(error)
    }

  },

  postHandler: async (req, res) => {
    
    let endpoint = findEndpoint(req.url)
    
    try {
      let resource = await lib.post(endpoint.resource, req.body)
      res.send(resource)
    } catch(error) {
      res.status(400).send(error)
    }

  },
  
  putHandler: async (req, res) =>  {
  
    let endpoint = findEndpoint(req.url.replace(`/${req.params.ID}`,""))
    
    try {
      let resource = await lib.put(endpoint.resource, req.body, req.params.ID)
      res.send(resource)
    } catch(error) {
      res.send(error)
    }
  
  },

  deleteHandler: async (req, res) => {
  
    let endpoint = findEndpoint(req.url.replace(`/${req.params.ID}`,""))
    
    try {
      await lib.delete(endpoint.resource, req.params.ID)
      res.sendStatus(200)
    } catch(error) {
      res.status(400).send(error)
    }
  
  }
}