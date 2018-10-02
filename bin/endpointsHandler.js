let db = require('./db')
let methodsHandler = require('./methodsHandler')

class EndpointHandler {
  constructor(endpoints, database) {
    this.endpoints = endpoints.sort( (a,b) => { 
      let x = a.path.toLowerCase(), y = b.path.toLowerCase()
      if(x < y) return -1
      if(x > y) return 1
      else return 0
    })
    this.db = database
    return this
  }

  init(app) {
    
    app.get('/', methodsHandler(this, "ROOT"))
    
    for( let i = 0; i < this.endpoints.length; i++) {
      const end = this.endpoints[i]
      end.collection = this.db.urlToCollection(end.path)
      if(end.methods.includes('GET')) {
        app.get(end.path, methodsHandler(this, "GET"))
        app.get(end.path + '/:ID', methodsHandler(this, "GET"))
      } else {
        app.get(end.path, methodsHandler(this, "NOT_SUPPORTED"))
        app.get(end.path, methodsHandler(this, "NOT_SUPPORTED"))
      }
      if(end.methods.includes('POST')) app.post(end.path, methodsHandler(this, "POST"))
      else app.post(end.path, methodsHandler(this, "NOT_SUPPORTED"))
      if(end.methods.includes('PUT')) app.put(end.path + "/:ID", methodsHandler(this, "PUT"))
      else app.put(end.path + "/:ID", methodsHandler(this, "NOT_SUPPORTED"))
      if(end.methods.includes('DELETE')) app.delete(end.path + "/:ID", methodsHandler(this, "DELETE"))
      else app.delete(end.path + "/:ID", methodsHandler(this, "NOT_SUPPORTED"))
    }
  }

  searchEndpoints(path) {
    let i = 0, k = this.endpoints.length - 1, m = Math.floor((i + k)/2)
    while(this.endpoints[m].path !== path && i < k) {
      if(path < this.endpoints[m].path) k = m - 1
      else if(path > this.endpoints[m].path) i = m + 1
      m = Math.floor((i + k)/2)
    }
    
    if(this.endpoints[m].path !== path) {
      return null
    } else return this.endpoints[m]
  }
}

module.exports = EndpointHandler
