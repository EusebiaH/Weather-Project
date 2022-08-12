const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = '432cf0a6dc534a0d06c30910b050c338';
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png";
      console.log(temp);
      console.log(weatherDescription);
      res.write("<p>The weather description " + weatherDescription + '</p><br>');
      res.write("<h1>The temperature in "+query+" is " + temp + " degrees Celcius.</h1>");
      res.write("<img src="+icon+" alt=''>");
      res.send();
    //  console.log(weatherData);

    })
  })
  // res.send("Server is up and running"); -- putem avea un sg send pe metoda
})







app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
