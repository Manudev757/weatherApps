const path = require("path");
const fs = require("fs");
const {
  allTimeZones,
  timeForOneCity,
  nextNhoursWeather,
} = require("./timeZone");
const cityData = allTimeZones();
const weatherForecast = (req, res) => {
  let filePath = path.join(req.url === "/" ? "Index.html" : req.url.slice(1));
  let extName = path.extname(filePath);
  let contentType = "text/html";
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
  if (extName == ".ico" || filePath == "Nil") {
    res.end();
    return;
  }
  if (req.url === "/allTimeZone") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(allTimeZones()));
    res.end();
  } else if (req.url.startsWith("/city")) {
    const city = req.url.split("/")[2];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(timeForOneCity(city)));
    res.end();
  } else if (req.url == "/hourlyForecast") {
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
  } else {
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  }
};

module.exports = weatherForecast;
