const { allTimeZones } = require("manudev_timezone");

let weatherData = allTimeZones();

//sending the fetched weather data to the child
process.send(weatherData);
