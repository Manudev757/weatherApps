const { allTimeZones } = require("manudev_timezone");
let weatherData = allTimeZones();
process.send(weatherData);
