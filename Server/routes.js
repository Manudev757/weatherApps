const path = require("path");
const fs = require("fs");

//Importing the Required functions from timzone.js
const {
  allTimeZones,
  timeForOneCity,
  nextNhoursWeather,
} = require("./timeZone");

//storing the city data in a variable
const cityData = allTimeZones();

//function call from the request
const weatherForecast = (req, res) => {
  //specifying a default path '/' when page loaded which serves index.html file
  let filePath = path.join(req.url === "/" ? "Index.html" : req.url.slice(1));
  let extName = path.extname(filePath);
  let contentType = "text/html";

  //identifying the extention of files requested to server
  switch (extName) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".svg":
      contentType = "image/svg+xml";
      break;
  }

  // Ignoring files with extension .ico and 'Nil'
  if (extName == ".ico" || filePath == "Nil") {
    res.end();
    return;
  }
  // gets all the city data
  if (req.url === "/allTimeZone") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(allTimeZones()));
    res.end();
  }
  //gets a detail of given city
  else if (req.url.startsWith("/city")) {
    const city = req.url.split("/")[2];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(timeForOneCity(city)));
    res.end();
  }
  //getting next 5 hours data by providing a city details of a particular city
  else if (req.url == "/hourlyForecast") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const txt = Buffer.concat(body).toString();
      var fin = JSON.parse(txt);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify(
          nextNhoursWeather(fin.city_Date_Time_Name, fin.hours, cityData)
        )
      );
      res.end();
    });
  }
  //Sending the html file to the browser
  else {
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  }
};

module.exports = weatherForecast;
