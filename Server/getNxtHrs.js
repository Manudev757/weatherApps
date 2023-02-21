const { allTimeZones, nextNhoursWeather } = require("manudev_timezone");

let weatherData = allTimeZones();
process.on("message", (cityInfo) => {
  const citydata = nextNhoursWeather(
    cityInfo.city_Date_Time_Name,
    cityInfo.hours,
    weatherData
  );
  process.send(citydata);
});
