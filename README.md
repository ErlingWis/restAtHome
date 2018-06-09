# restAtHome

CLI configurable JSON based REST API for simple projects.

**Powered by**

[Express](https://expressjs.com/)

[MongoDB](https://www.mongodb.com/)

## Install

by cURL

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ErlingWis/restAtHome/master/install/install.sh)"`


by wget

`sh -c "$(wget https://raw.githubusercontent.com/ErlingWis/restAtHome/master/install/install.sh -O -)"`

## Usage
### fast
```
$ restCli add /weather weather -a
$ sudo systemctl enable restAtHome 
$ sudo systemctl start restAtHome
```
now you can post some weather reports in JSON to your API and access them again.
```BASH
curl -X POST \
localhost:3000/weather \
-H 'content-type: application/json' \
-d '{\
"_id":"2018/05/06T14:51:10.401",\
"temperature":24,\
"unit":"celcius"\
}'
```

`curl localhost:3000/weather`
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
### configure ports and database information
By default the API will be accessible on port `3000`.

Configuring the port number and database configuration can be done in the config file located in `/etc/restAtHome`



### configure API
To configure the API use the restCli tool.

The tool supports the following commands:
#### add
```
  Usage: add [options] <path> <resource>

  Adds a Path to the API

  Options:

    --post [optional]     Adds POST requests
    --get [optional]      Adds GET requests
    --put [optional]      Adds PUT requests
    --delete [optional]   Adds DELETE requests
    -a, --all [optional]  Adds all methods
    -h, --help            output usage information
```
#### list
```
  Usage: list [options]

  Lists all Paths

  Options:

    -h, --help  output usage information
```
#### delete
```
  Usage: delete [options] <path>

  Deletes a Path from the derp

  Options:

    -r, --recursive  Deletes all endpoints under a path
    -w, --wipe       Wipes the collections from the database
    -h, --help       output usage information
```
#### EXAMPLE
`restCli add /car/toyota toyota -a`

adds the following endpoint to your API `<ip|hostname>:3000/car/toyota` with full CRUD functionality.

### Example with json file and curl
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

### Endpoint fields
Field | Value
--- | ---
path | The path your endpoint can be reached at, inputting `/car` here will make an endpoint accessible at `<hostname>:3000/car`
resource | name of the resource you want to store. For our `/car` endpoint, a natural choice would be `car`, for an endpoint called `/car/toyota` a good choice would be `toyota`
methods | Which methods should be allowed on the endpoint.<ul><li>GET allows both a clean `GET /car` for retrieving all documents available **AND** single documents by `GET /car/:ID`</li><li>POST allows creating documents at `POST /car`</li><li>PUT allows editing documents at `PUT /car/:ID`</li><li>DELETE allows deletion of documents at `DELETE /car/:ID`</li>
