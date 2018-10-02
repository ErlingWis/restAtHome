const express = require('express')
const configHandler = require('./configHandler')
const endpointsHandler = require('./endpointsHandler')
const db = require('./db')


start = async () => {
  
  try{
    const configPath = "/etc/restAtHome/restAtHome.conf"
    const config = new configHandler(configPath)
    const app = express()   
    
    if(config.api.cors === true) app.use(require('cors')()) 
    app.use(require('helmet')())
    app.use(require('morgan')('tiny'))
    app.use(require('body-parser').json())
    
    const database = new db(config.database)
    await database.connect()

    const controller = new endpointsHandler(config.endpoints, database).init(app)
        
    app.listen(config.api.port)
    
  } catch(error) {

    console.log(error)
  
  }

}

start()

