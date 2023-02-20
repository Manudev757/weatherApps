const http = require("http");
const PORT = 2020;
const weatherForecast = require("../Server/routes");

const server = http.createServer(weatherForecast);

server.listen(PORT, (err) => {
  if (err) console.log("Server not Connected!");
  else console.log(`Server Running at PORT: ${PORT}`);
});
