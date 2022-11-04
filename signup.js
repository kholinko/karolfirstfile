const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const https = require


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME:firstName,
          LNAME: lastName
        }
      }
    ]
  };

var jsonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/77e27fb5aa"

const options = {
  method: "POST",
  auth: "karol:ecbd6b5f803193028a609f3c4a2a5f77-us21"
}

const request = https.request(url, options, function(response) {
if (response.statusCode === 200) {
  res.sendFile(__dirname + "/success.html");
} else {
  res.sendFile(__dirname + "/fail.html");
}

  response.on("data", function(data){
    console.log(JSON.parse(data))
  })
})
requiest.write(jsonData);
request.end();
})

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("hey");
});

//ecbd6b5f803193028a609f3c4a2a5f77-us21
//77e27fb5aa
