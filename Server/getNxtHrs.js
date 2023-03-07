const { allTimeZones, nextNhoursWeather } = require("manudev_timezone");

let weatherData = allTimeZones();

//sending the fetched city's next 5 hrs weather data to the child by getting parameter from the process
process.on("message", (cityInfo) => {
  const citydata = nextNhoursWeather(
    cityInfo.city_Date_Time_Name,
    cityInfo.hours,
    weatherData
  );
  process.send(citydata);
});
