//jshint esversion:8

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://manojsinghmsr:crvst05GyfdcVYdd@cluster0.ijoe4.mongodb.net/waterconsumption?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology : true });
app.use(bodyParser.urlencoded({
     extended: true
}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/watertracker.html");
});

app.post("/",function(req,res){
  var name = req.body.name;
  var amtlit = req.body.amOfLit;
  var date = req.body.date;
  res.send("<h1>Thank you "+name+" for submitting</h1>");
  async function main(){
      try {
          // Connect to the MongoDB cluster
          await client.connect();

          // Make the appropriate DB calls
          await  listDatabases(client);

      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
    }
  newListing = {
    Name: name,
    AmtLit: amtlit,
    Date: date
  };
    main().catch(console.error);
    function createListing(client, newListing){
    const result = client.db("waterconsumption").collection("ConsumptionDetails").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    }
    res.end();
});

app.get("/water",function(req,res){
  client.connect(err => {
    console.log("Connected");
    const collection = client.db("waterconsumption").collection("ConsumptionDetails");
    var result = collection.ConsumptionDetails.find().pretty();
    res.send(result);
    client.close();
  });
});

app.listen(3000, function(){
  console.log("Server running at 3000");
});
