//jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req , res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req , res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName
      }
      }
    ]
  };



const jsonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/ba4b2eb069";

const options = {
  method : "POST",
  auth : "udeshya:3c867645afe1d1dcbfee35e3fcd08d0a-us21"
}

const request = https.request(url, options, function(response){

  if(response.statusCode===200){
    res.sendFile(__dirname + "/success.html");
  }
  else{
      res.sendFile(__dirname + "/failure.html");
  }

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("server is connected to 3000.");
});

// api key
// 3c867645afe1d1dcbfee35e3fcd08d0a-us21

// list id
// ba4b2eb069
