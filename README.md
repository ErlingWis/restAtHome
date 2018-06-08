# restAtHome

GUI controllet JSON based REST API for simple projects.

**Powered by**

[Express](https://expressjs.com/)

[MongoDB](https://www.mongodb.com/)

[Bulma](https://bulma.io/)
## Install

by cURL

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ErlingWis/restAtHome/master/install/install.sh)"`


by wget

`sh -c "$(wget https://raw.githubusercontent.com/ErlingWis/restAtHome/master/install/install.sh -O -)"`

## Usage

By default the API will be accessible on port `3000` and the GUI on port `25000`.

Configuring port numbers can be done in the config files located in `/etc/restAtHome`

To create a new endpoint for your API, simply click the **Create endpoint** button.

After you're done creating endpoints, go back to the homepage and click the giant **RESTART API** button.

Now you can push, pull, edit and delete items in your API by executing simple HTTP commands!
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
