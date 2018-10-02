const fs = require('fs')
const YAML = require('yaml')

class Config {
  constructor(path) {
    this.path = path
    this.reload()
  }

  loadYAML() {
    return fs.readFileSync(this.path).toString()
  }

  loadConfig() {
    return YAML.parse(this.loadYAML(this.path))
  }

  reload(){
    
    let config = this.loadConfig(this.path)
    this.endpoints = config.endpoints
    this.api = config.api
    this.database = config.database
    if(!this.valid()) throw "Error in config"
  }

  valid() {
    if(!this.api.port) return false
    
    if(!this.database.port) return false
    if(!this.database.host) return false
    if(!this.database.database) return false
    
    if(!Array.isArray(this.endpoints)) return false
    for(let endpoint of this.endpoints) {
      if(!endpoint.path) return false
      if(!endpoint.identifier) return false
      if(!Array.isArray(endpoint.methods)) return false
      if(endpoint.methods.length === 0) return false
    }
    return true
  }
}

module.exports = Config
