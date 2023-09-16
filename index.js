var Express = require("express")
var mongoClinet = require("mongodb").MongoClient;
var Cors = require("cors");
var Multer = require("multer");
const multer = require("multer");

var App = Express();
App.use(Cors());

var CONNECTION_STRING = "#####";
var DatabaseName = "todoapp";
var Database;

App.listen(5053, ()=> {
  mongoClinet.connect(CONNECTION_STRING,(error,client) => {
    if (error) {
      console.error("Mongo Db Connection Error:", error);
    } else {
      Database = client.db(DatabaseName);
      console.log("Mongo Db Connection Successful");
    }
  })
})

App.get('/api/todoapp/GetNotes', (request, response) => {
  Database.collection("todoappcollection").find({}).toArray((error,result) => {
    response.send(result);
  });
})

App.post('/api/todoapp/AddNotes', multer().none(), (request, response) => {
  Database.collection("todoappcollection").count({},function(error, numOfDoc){
    Database.collection("todoappcollection").insertOne({
      id: (numOfDoc+1).toString(),
      description: request.body.newNotes 
    });
    response.json("Successfully Added");
  })
})

App.delete('/api/todoapp/DeleteNote',(request,response) => {
  Database.collection("todoappcollection").deleteOne({
    id:request.query.id
  });
  response.json("Deleted Successfully");
})
