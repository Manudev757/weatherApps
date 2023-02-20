const http = require("http");
const PORT = 2020;

//Importing routes page that contains the functions called to timezone.js
const weatherForecast = require("../Server/routes");

//creating a Server and firing a function weatherForecast
const server = http.createServer(weatherForecast);

//Listening to the specified port - 2020
server.listen(PORT, (err) => {
  if (err) console.log("Server not Connected!");
  else console.log(`Server Running at PORT: ${PORT}`);
});
