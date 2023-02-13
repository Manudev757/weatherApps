// extracting data from data.json
var weatherData;
var a = 1;
fetch("data.json")
  .then((data) => data.json())
  .then((result) => {
    weatherData = result;
    console.log(result);
    setWeather();
    weather();
    //function call from 2-nd Task not included for task-1
    sunny("sun");
    for (const citykey of Object.keys(weatherData)) {
      weatherArray.push(weatherData[citykey]);
    }
    continent("continent");
  });
// SETTING THE DATALIST BOX AND
// THE CITY IMAGES IN MID SECTION
function setWeather() {
  var keys = Object.keys(weatherData);
  var option = ``;
  for (var i = 0; i < keys.length; i++) {
    option += `<option value=${keys[i]}></option>`;
  }
  document.querySelector("#browsers").innerHTML = option;
  document.getElementById("sun").style.borderBottom = "2.5px solid blue";
  document.getElementById("snow").style.borderBottom = "none";
  document.getElementById("rain").style.borderBottom = "none";

  var t, p, h, time;
  for (var k = 0; k < keys.length; k++) {
    t = parseInt(weatherData[keys[k]].temperature);
    p = parseInt(weatherData[keys[k]].precipitation);
    h = parseInt(weatherData[keys[k]].humidity);
    if (t > 29 && h < 50 && p >= 50) {
      tdyDate = weatherData[keys[k]].dateAndTime;
      tdyDate = tdyDate.split(",", 1);
      time = weatherData[keys[k]].timeZone;
      var dates = new Date().toLocaleString("en-US", {
        timeZone: time,
        timeStyle: "medium",
        hourCycle: "h24",
      });
      dates = dates.slice(0, 5);
    }
  }
}
// SETTING THE CURRENT TIME,DATE, WEATHER AND
//  WEATHER TIMELINE OF VARIOUS CITIES in top section
function getWeatherIcon(temp) {
  let icon;
  if (temp > 29) icon = "sunnyIcon";
  else if (temp < 18) icon = "rainyIcon";
  else if (temp >= 23 && temp <= 29) icon = "precipitationIcon";
  else icon = "windyIcon";
  return icon;
}
function weather() {
  var keys = Object.keys(weatherData);
  var name = document.getElementById("data").value;
  // Validating if no city is chosen
  if (name === "") {
    document.getElementById("data").style.border = "2px solid red";
  }
  var b = true;
  // setting the current temp, percep,humid,farenheit of the city
  for (var j = 0; j < keys.length; j++) {
    if (name === keys[j]) {
      var temp = weatherData[keys[j]];
      var nxt,
        tdyDate,
        b = false;
      var timeZone = temp.timeZone;
      var setTimeLine = ``;
      document.getElementById("temp").innerHTML = temp.temperature;
      document.getElementById("humid").innerHTML = temp.humidity;
      document.getElementById("precipitation").innerHTML = temp.precipitation;
      var f = parseInt(temp.temperature);
      var farenheit = (f * 9) / 5 + 32;
      document.getElementById("fah").innerHTML = Math.round(farenheit) + " F";
      document.querySelector(
        ".grid-child-1"
      ).innerHTML = `<img id="bg-img" src="Asset/${name}.svg" width="90px" />`;
      tdyDate = temp.dateAndTime;
      tdyDate = tdyDate.split(",", 1);
      document.getElementById("tdyDate").innerHTML = tdyDate;
      var dates = new Date().toLocaleString("en-US", {
        timeZone: timeZone,
        timeStyle: "medium",
        hourCycle: "h24",
      });
      //finding weather the time is AM or PM
      var ampm = parseInt(dates.slice(0, 2));
      dates = dates.slice(0, 8);
      var day = ampm >= 12 ? "pmState" : "amState";
      document.getElementById("time").innerHTML = `${dates}&nbsp;&nbsp;<img
          src="Asset/${day}.svg"
          />`;
      ampm += 1;
      //setting the next 5 hrs temperature for selected city
      for (var t = -1; t < 5; t++) {
        nxt = t == -1 ? "Now" : parseInt(ampm++);
        setTimeLine += `
      <div class="weather-icon">
      <p id="time11">${nxt}</p>
      <br />
      <p>|</p>
      <br />
      <img id="w_icon" src="Asset/${
        t == -1
          ? getWeatherIcon(parseInt(temp.temperature))
          : getWeatherIcon(parseInt(temp.nextFiveHrs[t]))
      }.svg" /><br />
      <p id="nxtTime1">
      ${
        t == 4
          ? 25
          : t != -1
          ? parseInt(temp.nextFiveHrs[t])
          : parseInt(temp.temperature)
      }
        </p>
      <br />
      </div>
      <p>|</p>`;
      }
      document.querySelector(".flex-wrapper").innerHTML = setTimeLine;
    }
  }
  // Validating top section, if city is Miss-Spelled
  if (b != true) {
    document.getElementById("data").style.border = "none";
    document.getElementById("data").style.backgroundColor = "grey";
    document.querySelector(
      ".grid-child-1"
    ).innerHTML = `<img id="bg-img" src="Asset/${name}.svg" width="90px" />`;
  } else {
    document.getElementById("data").style.border = "3px solid red";
    document.getElementById("data").style.backgroundColor = "#E82C2C";
    document.querySelector(
      ".grid-child-1"
    ).innerHTML = `<div class="nil">Invalid City</div>`;
    document.getElementById("fah").innerHTML = "Nil";
    document.getElementById("precipitation").innerHTML = "Nil";
    document.getElementById("temp").innerHTML = "Nil";
    document.getElementById("humid").innerHTML = "Nil";
    document.querySelectorAll("#nxtTime1").forEach((elem) => {
      elem.innerText = "Nil";
    });
    document.querySelectorAll("#w_icon").forEach((elem) => {
      elem.src = "Nil";
    });
    document.getElementById("time").innerHTML = "Nil";
    document.getElementById("tdyDate").innerHTML = "Nil";
    document.querySelectorAll("#time11").forEach((element) => {
      element.innerText = "Nil";
    });
  }
}
//To set The time Live Running on our screen
setInterval(weather, 1000);
// setInterval(continent, 1000);
// setInterval(continents_data, 1000);
// ******** SUNNY function - 2nd Task function*******
var sortedArray = [];
var sendWeather;
function sort_fun(val) {
  var keys = Object.keys(weatherData);
  var i = 0;

  sortedArray = [];
  if (val === "sun") {
    document.getElementById("sun").style.borderBottom = "2.5px solid blue";
    document.getElementById("snow").style.borderBottom = "none";
    document.getElementById("rain").style.borderBottom = "none";
    for (var k = 0; k < keys.length; k++) {
      t = parseInt(weatherData[keys[k]].temperature);
      p = parseInt(weatherData[keys[k]].precipitation);
      h = parseInt(weatherData[keys[k]].humidity);
      if (t > 29 && h < 50 && p >= 50) {
        sortedArray[i] = weatherData[keys[k]];
        i++;
      }
    }
    console.log(sortedArray);
    sortedArray.sort((a, b) => {
      return parseInt(a.temperature) - parseInt(b.temperature);
    });
  }
  if (val === "snow") {
    document.getElementById("sun").style.borderBottom = "none";
    document.getElementById("snow").style.borderBottom = "2.5px solid blue";
    document.getElementById("rain").style.borderBottom = "none";
    for (var k = 0; k < keys.length; k++) {
      t = parseInt(weatherData[keys[k]].temperature);
      p = parseInt(weatherData[keys[k]].precipitation);
      h = parseInt(weatherData[keys[k]].humidity);
      if (t > 20 && t < 28 && h > 50 && p < 50) {
        sortedArray[i] = weatherData[keys[k]];
        i++;
      }
    }
    sortedArray.sort((a, b) => {
      return parseInt(a.humidity) - parseInt(b.humidity);
    });
  }
  if (val === "rain") {
    document.getElementById("sun").style.borderBottom = "none";
    document.getElementById("snow").style.borderBottom = "none";
    document.getElementById("rain").style.borderBottom = "2.5px solid blue";
    for (var k = 0; k < keys.length; k++) {
      t = parseInt(weatherData[keys[k]].temperature);
      p = parseInt(weatherData[keys[k]].precipitation);
      h = parseInt(weatherData[keys[k]].humidity);
      if (t < 20 && h >= 50) {
        sortedArray[i] = weatherData[keys[k]];
        i++;
      }
    }
    sortedArray.sort((a, b) => {
      return parseInt(a.precipitation) - parseInt(b.precipitation);
    });
  }
}
function sunny(data) {
  document.getElementById("sun").style.borderBottom = "2.5px solid blue";
  document.getElementById("snow").style.borderBottom = "none";
  document.getElementById("rain").style.borderBottom = "none";
  var cities = ``;
  var time;
  if (data != "displayTop") {
    sendWeather = data;
  }
  var input_box = document.getElementById("input_box").value;
  sort_fun(sendWeather);
  for (var k = 0; k < sortedArray.length; k++) {
    tdyDate = sortedArray[k].dateAndTime;
    tdyDate = tdyDate.split(",", 1);
    time = sortedArray[k].timeZone;
    var dates = new Date().toLocaleString("en-US", {
      timeZone: time,
      timeStyle: "medium",
      hourCycle: "h24",
    });
    var ampm = parseInt(dates.slice(0, 2));
    dates = dates.slice(0, 5);
    var day = ampm >= 12 ? "Pm" : "Am";

    if (input_box > k) {
      cities += `<div class="img-1">
          <img class="main-img" src="Asset/${sortedArray[k].cityName}.svg" />
          <div class="img-text">${sortedArray[k].cityName}</div>
          <div class="img-icon">
            <img src="Asset/sunnyIcon.svg" />&nbsp;
            <p>${sortedArray[k].temperature}</p>
          </div>
          <div class="timeDate">
          <div>${dates + " " + day}</div>
          <div>${tdyDate}</div>
        </div>
          <div class="side-icon">
            <div>
              <img src="Asset//humidityIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
              <p>${sortedArray[k].humidity}</p>
            </div>
            <div>
              <img src="Asset/precipitationIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
              <p>${sortedArray[k].precipitation}</p>
            </div>
          </div>
        </div>`;
      if (input_box <= 4) {
        document.getElementById("button1").style.visibility = "hidden";
        document.getElementById("button2").style.visibility = "hidden";
      } else {
        document.getElementById("button1").style.visibility = "visible";
        document.getElementById("button2").style.visibility = "visible";
      }
    }
  }

  document.querySelector(".mid-mid").innerHTML = cities;
}
//HORIZONTAL SCROLL BUTTON
function leftScroll() {
  const left = document.querySelector(".mid-mid");
  left.scrollBy(290, 0);
}
function rightScroll() {
  const right = document.querySelector(".mid-mid");
  right.scrollBy(-290, 0);
}
let sortOrder = {
  continent: true,
  temperature: false,
};

let weatherArray = [];

function continent(sortKey) {
  const sortContinent = document.querySelector("#sortContinent");
  const sortTemperature = document.querySelector("#sortTemperature");
  if (sortKey == "continent") {
    sortOrder.continent = !sortOrder.continent;
    sortContinent.src = `./Asset/arrow${
      sortOrder.continent ? "Up" : "Down"
    }.svg`;
  } else if (sortKey == "temperature") {
    sortOrder.temperature = !sortOrder.temperature;
    sortTemperature.src = `./Asset/arrow${
      sortOrder.temperature ? "Up" : "Down"
    }.svg`;
  }
  let Cont_dir = sortOrder.continent ? 1 : -1;
  let Cont_temp = sortOrder.temperature ? 1 : -1;
  weatherArray.sort((a, b) => {
    const cont_a = a.timeZone.split("/")[0];
    const cont_b = b.timeZone.split("/")[0];
    return (
      Cont_dir * cont_a.localeCompare(cont_b) ||
      Cont_temp * (parseInt(a.temperature) - parseInt(b.temperature))
    );
  });
  var data = ``;
  for (var i = 0; i < 12; i++) {
    var dates = new Date().toLocaleString("en-US", {
      timeZone: weatherArray[i].timeZone,
      timeStyle: "medium",
      hourCycle: "h24",
    });
    var ampm = parseInt(dates.slice(0, 2));
    dates = dates.slice(0, 9);
    var day = ampm >= 12 ? "Pm" : "Am";
    data += `
            <div class="container">
            <div class="cont-1">
              <p>${weatherArray[i].timeZone.split("/")[0]}</p>
              <p>${weatherArray[i].temperature}</p>
            </div>
            <div class="cont-2">
              <p>${weatherArray[i].cityName}, ${dates} ${day}</p>
              <img src="Asset/humidityIcon.svg" />
              <p>${weatherArray[i].humidity}</p>
            </div>
          </div>
            `;
  }
  document.querySelector(".bot-mid").innerHTML = data;
}
