let express = require('express')
let app = express()
let fs = require('fs')
let lib = require('./lib')
let db = require('./db')
let controllers = require('./controllers')

app.use(require('helmet')())
app.use(require('morgan')('tiny'))
app.use(require('body-parser').json())


start = async () => {
  
  try{
    
    let config = lib.parseConfig()

    await db.connect(config.database)
    let endpoints = await db.getEndpoints()
    
    controllers.initEndpoints(endpoints, app, controllers.handlers)
    
    app.listen(config.api.port)

  } catch(error) {

    console.log(error)
  
  }

}

start()

