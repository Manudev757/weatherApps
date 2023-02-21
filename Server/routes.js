const { fork } = require("child_process");

const getWeather = (req, res) => {
  const child_getweather = fork(__dirname + "/weather.js");
  child_getweather.on("message", (message) => {
    if (message) res.json(message);
    else res.status(404).json({ message: "Data Not Found!!" });
    child_getweather.kill();
  });
};

const getCityData = (req, res) => {
  const child_getweather = fork(__dirname + "/getCity.js");
  var city = req.params.id;
  child_getweather.send(city);
  child_getweather.on("message", (city) => {
    if (city) res.json(city);
    else res.status(404).json({ message: "City Not Found!!" });
    child_getweather.kill();
  });
};

const getNxtFivHrs = (req, res) => {
  const child_getweather = fork(__dirname + "/getNxtHrs.js");
  let cityData = req.body;
  child_getweather.send(cityData);
  child_getweather.on("message", (cityInfo) => {
    if (cityInfo) res.json(cityInfo);
    else res.status(404).json({ message: "Invalid City Data!!" });
    child_getweather.kill();
  });
};

module.exports = { getWeather, getCityData, getNxtFivHrs };
