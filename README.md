# restAtHome

simple configurable JSON based REST API for when you just need to store some JSON in a database.

**Powered by**

[Express](https://expressjs.com/)

[MongoDB](https://www.mongodb.com/)

## Install

by cURL

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ErlingWis/restAtHome/master/install/install.sh)"`


by wget

`sh -c "$(wget https://raw.githubusercontent.com/ErlingWis/restAtHome/master/install/install.sh -O -)"`

## Usage
### config
The configuration file is YAML based and is located in `/etc/restAtHome/restAtHome.conf`. 

By default it looks something like this

```
api:
  cors: false
  port: 3000
database:
  host: localhost
  port: 27017
  database: restAtHome
endpoints:
  - path: /demoPath
    identifier: unique_identifier
    methods:
      - DELETE
      - GET
      - POST
      - PUT
```
Adding endpoints to the `endpoints` list will allow you to access more endpoints.

The API needs to be restarted after changing the config file.

### start and stop

The API can be controlled with systemd as a service
```BASH
# Start API 
systemctl start restAtHome 

# Stop API
systemctl stop restAtHome

# Restart API
systemctl restart restAtHome

# Automatically start at reboot
systemctl enable restAtHome

# remove automatic start at reboot
systemctl disable restAtHome

# check status
systemctl status restAtHome
```
## Examples
### Config
Editing the config file to:
```
api:
  cors: false
  port: 3000
database:
  host: localhost
  port: 27017
  database: restAtHome
endpoints:
  - path: /demoPath
    identifier: unique_identifier
    methods:
      - DELETE
      - GET
      - POST
      - PUT
  - path: /weather
    identifier: datetime
    methods:
      - DELETE
      - GET
      - POST
      - PUT
```


adds the following endpoint to your API `localhost:3000/weather` with full CRUD functionality.

### POST json file with curl
**weather.json**
```
{ 
  "datetime": 1538499323,
  "temperature": 21,
  "scale": "Celcius",
  "report": "windy"
}
```
**POST with curl**
```
curl -X POST \
localhost:3000/weather \
-H 'Content-Type: Application/JSON' \
-d @weather.json
```
### GET JSON object with curl
`curl localhost:3000/weather/1538499323`
### GET all objects in an enpoint with curl
`curl localhost:3000/weather`
### PUT an object with curl
```
curl -X PUT \
localhost:3000/weather/1538499323 \
-H 'Content-Type: Application/JSON' \
-d '{"report":"sunny"}' \
```
### DELETE an object with curl
`curl -X DELETE localhost:3000/weather/1538499323`
