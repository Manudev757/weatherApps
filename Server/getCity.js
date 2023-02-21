const { timeForOneCity } = require("manudev_timezone");

//sending the fetched city weather data to the child by getting parameter from the process
process.on("message", (city) => {
  const citydata = timeForOneCity(city);
  process.send(citydata);
});
