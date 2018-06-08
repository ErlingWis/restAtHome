let express = require('express')
let app = express()
let helmet = require('helmet')
let endpoints = require('./endpoints')
let lib = require('./lib')
let morgan = require('morgan')
let fs = require('fs')



app.use(helmet())
app.use(morgan('tiny'))

initEndpoints = (endpoints, application, handlers) => {
  
  for(let i = 0; i < endpoints.length; i++) {
    
    let endpoint = endpoints[i]
    
    if(endpoint.methods.includes('GET')) {
       
      application.get(endpoint.path, handlers.getHandler)
      application.get(endpoint.path + "/:ID", handlers.getHandler)
    
    }
    
    if(endpoint.methods.includes('POST')) {
      
       application.post(endpoint.path, handlers.postHandler)
    
    }

    if(endpoint.methods.includes('PUT')) {
      
      application.put(endpoint.path + "/:ID", handlers.putHandler)
    
    }
    
    if(endpoint.methods.includes('DELETE')) {
      
      application.delete(endpoint.path + "/:ID", handlers.deleteHandler)
      
    }
  
  }

}

findEndpoint = (path) => {
  
  for(let i = 0; i < endpoints.length; i++){
    if(endpoints[i].path === path) return endpoints[i]
  }

}

collectiveHandler = {
  
  getHandler: async (req, res) => {

    let endpoint = findEndpoint(req.url)
    
    try { 
      let resource = await lib.get(endpoint.resource, req.params.ID)
      res.send(endpoint)
    } catch(error) {
      res.send(error)
    }

  },

  postHandler: async (req, res) => {
    
    let endpoint = findEndpoint(req.url)
    
    try {
      let resource = await lib.post(endpoint.resource, req.body)
      res.send(resource)
    } catch(error) {
      res.send(error)
    }

  },
  
  putHandler: async (req, res) =>  {
  
    let endpoint = findEndpoint(req.url)
    
    try {
      let resource = await lib.put(endpoint.resource, req.body, req.params.ID)
      res.send(resource)
    } catch(error) {
      res.send(error)
    }
  
  },

  deleteHandler: async (req, res) => {
  
    let endpoint = findEndpoint(req.url)
    
    try {
      await lib.delete(endpoint.resource, req.params.ID)
      res.send(200)
    } catch(error) {
      res.send(error)
    }
  
  }
}

fs.readFile('/etc/restAtHome/config', (err, file) => {
  
  if(err) throw err
  
  else{
    
    let config = JSON.parse(file)
    
    initEndpoints(endpoints, app, collectiveHandler)
    
    app.listen(config.api.port,() => {
      console.log('running with config:')
      console.log(config)
      
    })
  
  }

})

