const express = require("express");
const bodyParser = require("body-parser"); //**
const request = require("request");
const https = require("https"); // https module

const app = express();

//static is a express function that provides the path to ht estatic files
//in order to use static files (css and bootstrap)
// create a folder called public and inside this folder
// I put the styles.css ans the image folder
//
app.use(express.static("public"));

//tells the app to use body-parser
app.use(bodyParser.urlencoded({
  extended: true
})); //**

// get method to the home page rout
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


//**
app.post("/", function(req, res) {
  const firstName = req.body.fName; //req.body we can use the elements from the html file //**
  const lastName = req.body.lName; // ||
  const email = req.body.email; // ||
  // data object. chec references @ mailchimp api.
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }

    }]
  };

  // turning in a flatpack json
  const jsonData = JSON.stringify(data);

  const url = "https://us2.api.mailchimp.com/3.0/lists/8bc2594468";

  const options = {
    method: "POST",
    auth: "lvsantos:380324339f22bcba77b63550654de4c5-us2"

  }

  //to make a request
  const request = https.request(url, options, function(response){



    if (response.statusCode == 200){

        res.sendFile(__dirname + "/success.html");


    }else{

      res.sendFile(__dirname + "/failure.html");

    };


    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

//POST request for the failre route

app.post("/failure", function(req,res){
  res.redirect("/");
});

// listen method defines where the website will be shown
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is runing on pot 3000.");
});


// MailChimp - API Key: 380324339f22bcba77b63550654de4c5-us2

// List ID - 8bc2594468
