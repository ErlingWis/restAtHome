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


adds the following endpoint to your API `<ip|hostname>:3000/weather` with full CRUD functionality.

### Create jsonobject with curl
**car.json**
```
{ 
  "_id": "EK12345",
  "color": "blue",
  "engine": "electric",
  "owner": "Stolt Jensenberg",
  "type": "Tesla",
  "model": "sedan"
}
```
**POST with curl**
```
curl -X POST \
localhost:3000/car \
-H 'Content-Type: Application/JSON' \
-d @car.json
```
