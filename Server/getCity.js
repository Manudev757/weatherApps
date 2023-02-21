const { timeForOneCity } = require("manudev_timezone");

process.on("message", (city) => {
  const citydata = timeForOneCity(city);
  process.send(citydata);
});
