const parser = require('./parseUtil')

function importObject(identifier, object) {
  object._id = object[identifier]
  delete object[identifier]
  return object
}

function exportObject(identifier, object) {
  if( Array.isArray(object) ) {
    return object.map(e => {
      e[identifier] = e._id
      delete e._id
      return e
    })
  } else {
    object[identifier] = object._id
    delete object._id
    return object
  }
}

function strip_url(req) {
  let s1 = req.url.replace(`/${req.params.ID}`,"")
  let s2 = s1.replace(/\?.*$/, "")
  return s2
}

function methods(endpointsHandler, method) {
 
 if ( method === "GET" ) return async (req, res) => {
    try {
      let helper = strip_url(req)
      let end = endpointsHandler.searchEndpoints(helper)
      if(parser.IsNumeric(req.params.ID)) req.params.ID = parser.parseNumber(req.params.ID)
      console.log(req.params.ID)
      let resource = await endpointsHandler.db.get(end.collection, req.params.ID, req.query.page)
      return resource === null ? res.sendStatus(404) : res.send(exportObject(end.identifier, resource))
    } catch(e) {
      return res.send(e)
    }
  }
  
  else if (method === "POST" ) return async (req, res) => {
    try {
      let end = endpointsHandler.searchEndpoints(req.url.replace(`/${req.params.ID}`,""))
      
      let fields = Object.keys(req.body)
      if (!fields.includes(end.identifier)) return res.json({message: "need identifier"})
      
      let resource = await endpointsHandler.db.post(end.collection, importObject(end.identifier, req.body))
      return res.sendStatus(200)
    } catch(e) {
      return res.send(e)
    }
  }

  else if (method === "PUT") return async (req, res) => {
    try {
      let end = endpointsHandler.searchEndpoints(req.url.replace(`/${req.params.ID}`,""))
      let resource = await endpointsHandler.db.put(end.collection, req.body, req.params.ID)
      
      let fields = Object.keys(req.body)
      if(fields.includes(end.identifier) || fields.includes("_id")) return res.json({message: "cant change those values"})
       
      return resource === null ? res.sendStatus(404) : res.send(exportObject(end.identifier,resource))
    } catch(e) {
      return res.send(e)
    }
  }

  else if (method === "DELETE") return async (req, res) => {
    try {
      let end = endpointsHandler.searchEndpoints(req.url.replace(`/${req.params.ID}`,""))
      let deleted = await endpointsHandler.db.delete(end.collection, req.params.ID)
      return deleted ? res.sendStatus(200) : res.sendStatus(404)
    } catch(e) {
      return res.send(e)
    }
  }

  else if (method === "ROOT") return (req, res) => {
    const paths = endpointsHandler.endpoints.map( e => e.path )
    return res.send(paths)
  }
  else if (method === "NOT_SUPPORTED") return (req, res) => {
    const msg = {
      message: `${req.method} not supported for ${req.url}`
    }
    return res.send(msg)
  }
}

module.exports = methods
