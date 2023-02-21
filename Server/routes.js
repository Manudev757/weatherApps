//Importing the Required functions from timzone.js
const {
  allTimeZones,
  timeForOneCity,
  nextNhoursWeather,
} = require("./timeZone");

//storing the city data in a variable
const cityData = allTimeZones();

const getWeather = (req, res) => {
  let weatherData = allTimeZones();
  if (weatherData) res.json(weatherData);
  else res.status(404).json({ message: "Data Not Found!!" });
};

const getCityData = (req, res) => {
  var city = req.params.id;
  if (city) res.json(timeForOneCity(city));
  else res.status(404).json({ message: "City Not Found!!" });
};

const getNxtFivHrs = (req, res) => {
  let city = req.body;
  if (city)
    res.json(
      nextNhoursWeather(req.body.city_Date_Time_Name, req.body.hours, cityData)
    );
  else res.status(404).json({ message: "Invalid City Data!!" });
};

module.exports = { getWeather, getCityData, getNxtFivHrs };
