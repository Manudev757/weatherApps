const express = require("express");
const app = express();
const PORT = 2020;
const path = require("path");

app.use(express.json());

//Importing routes page that contains the functions called to timezone.js
const weatherForecast = require("./Server/routes");

//display html file
app.use(express.static(path.join(__dirname, "Client")));

//request to server
app.get("/allTimeZone", weatherForecast.getWeather);
app.get("/city/:id", weatherForecast.getCityData);
app.post("/hourlyForecast", weatherForecast.getNxtFivHrs);

//Listening to the specified port - 2020
app.listen(PORT, (err) => {
  if (err) console.log("Server not Connected!");
  else console.log(`Server Running at PORT: ${PORT}`);
});
