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
  });

// SETTING THE DROPDONW BOX AND
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
  var t,
    p,
    h,
    count = 0;
  var cities = ``,
    time;
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

      var ampm = parseInt(dates.slice(0, 2));
      dates = dates.slice(0, 5);
      var day = ampm >= 12 ? "Pm" : "Am";
      var date = weatherData[keys[k]].dateAndTime;

      count++;
      cities += `<div class="img-1">
          <img class="main-img" src="Asset/${
            weatherData[keys[k]].cityName
          }.svg" />
          <div class="img-text">${weatherData[keys[k]].cityName}</div>
          <div class="img-icon">
            <img src="Asset/sunnyIcon.svg" />&nbsp;
            <p>${weatherData[keys[k]].temperature}</p>
          </div>
          <div class="timeDate">
          <div>${dates + " " + day}</div>
          <div>${tdyDate}</div>
        </div>
          <div class="side-icon">
            <div>
              <img src="Asset//humidityIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
              <p>${weatherData[keys[k]].humidity}</p>
            </div>
            <div>
              <img src="Asset/precipitationIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
              <p>${weatherData[keys[k]].precipitation}</p>
            </div>
          </div>
        </div>`;

      document.querySelector(".mid-mid").innerHTML = cities;
    }
  }
}

// SETTING THE CURRENT TIME,DATE, WEATHER AND
//  WEATHER TIMELINE OF VARIOUS CITIES in top section
function weather() {
  var keys = Object.keys(weatherData);
  var name = document.getElementById("data").value;

  if (name === "") {
    document.getElementById("data").style.border = "2px solid red";
  }
  var b = true;
  for (var j = 0; j < keys.length; j++) {
    if (name === keys[j]) {
      b = false;
      var temp = weatherData[keys[j]];
      var nxt, tdyDate;
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
      var ampm = parseInt(dates.slice(0, 2));
      dates = dates.slice(0, 8);
      var day = ampm >= 12 ? "amState" : "amState";
      document.getElementById("time").innerHTML = `${dates}&nbsp;&nbsp;<img
          src="Asset/${day}.svg"
          />`;

      var icon;
      if (parseInt(temp.temperature) > 29) icon = "sunnyIcon";
      else if (parseInt(temp.temperature) < 18) icon = "rainyIcon";
      else if (
        parseInt(temp.temperature) >= 23 &&
        parseInt(temp.temperature) <= 29
      )
        icon = "precipitationIcon";
      else icon = "windyIcon";

      setTimeLine += `
      <div class="weather-icon">
      <p id="time11">Now</p>
      <br />
      <p>|</p>
      <br />
      <img id="w_icon" src="Asset/${icon}.svg" /><br />
      <p id="nxtTime1">${parseInt(temp.temperature)}</p>
      <br />
      </div>
      <p>|</p>`;
      ampm += 1;
      for (var t = 0; t < 5; t++) {
        nxt = parseInt(temp.nextFiveHrs[t]);
        if (nxt > 29) {
          setTimeLine += `
          <div class="weather-icon">
              <p id="time11">${ampm++}</p>
              <br />
              <p>|</p>
              <br />
              <img id="w_icon" src="Asset/sunnyIcon.svg" /><br />
              <p id="nxtTime1">${nxt}</p>
              <br />
            </div>
            <p>|</p>
          `;
          document.querySelector(".flex-wrapper").innerHTML = setTimeLine;
        } else if (nxt < 18) {
          setTimeLine += `
          <div class="weather-icon">
              <p id="time11">${ampm++}</p>
              <br />
              <p>|</p>
              <br />
              <img id="w_icon" src="Asset/rainyIcon.svg" /><br />
              <p id="nxtTime1">${nxt}</p>
              <br />
            </div>
            <p>|</p>
          `;
          document.querySelector(".flex-wrapper").innerHTML = setTimeLine;
        } else if (nxt >= 23 && nxt <= 29) {
          setTimeLine += `
          <div class="weather-icon">
              <p id="time11">${ampm++}</p>
              <br />
              <p>|</p>
              <br />
              <img id="w_icon" src="Asset/precipitationIcon.svg" /><br />
              <p id="nxtTime1">${nxt}</p>
              <br />
            </div>
            <p>|</p>
          `;

          document.querySelector(".flex-wrapper").innerHTML = setTimeLine;
        } else if (nxt >= 18 && nxt <= 22) {
          setTimeLine += `
          <div class="weather-icon">
              <p id="time11">${ampm++}</p>
              <br />
              <p>|</p>
              <br />
              <img id="w_icon" src="Asset/windyIcon.svg" /><br />
              <p id="nxtTime1">${nxt}</p>
              <br />
            </div>
            <p>|</p>
          `;
          document.querySelector(".flex-wrapper").innerHTML = setTimeLine;
        }
        if (t === 4) {
          setTimeLine += `<div class="weather-icon">
          <p id="time11">${ampm++}</p>
          <br />
          <p>|</p>
          <br />
          <img id="w_icon" src="Asset/precipitationIcon.svg" /><br />
          <p id="nxtTime1">${parseInt(temp.temperature)}</p>
          <br />
          </div>
          `;
          document.querySelector(".flex-wrapper").innerHTML = setTimeLine;
        }
      }
    }
  }
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
  }
}

setInterval(weather, sunny, snow, rainy, 1000);

// SORTING CITIES BASED ON THE WEATHER

// SUNNY
function sunny() {
  document.getElementById("sun").style.borderBottom = "2.5px solid blue";
  document.getElementById("snow").style.borderBottom = "none";
  document.getElementById("rain").style.borderBottom = "none";
  var keys = Object.keys(weatherData);
  var t,
    p,
    h,
    count = 0;
  var cities = ``;
  var time;

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

      var ampm = parseInt(dates.slice(0, 2));
      dates = dates.slice(0, 5);
      var day = ampm >= 12 ? "Pm" : "Am";
      var date = weatherData[keys[k]].dateAndTime;

      count++;
      cities += `<div class="img-1">
          <img class="main-img" src="Asset/${
            weatherData[keys[k]].cityName
          }.svg" />
          <div class="img-text">${weatherData[keys[k]].cityName}</div>
          <div class="img-icon">
            <img src="Asset/sunnyIcon.svg" />&nbsp;
            <p>${weatherData[keys[k]].temperature}</p>
          </div>
          <div class="timeDate">
          <div>${dates + " " + day}</div>
          <div>${tdyDate}</div>
        </div>
          <div class="side-icon">
            <div>
              <img src="Asset//humidityIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
              <p>${weatherData[keys[k]].humidity}</p>
            </div>
            <div>
              <img src="Asset/precipitationIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
              <p>${weatherData[keys[k]].precipitation}</p>
            </div>
          </div>
        </div>`;
    }
    document.querySelector(".mid-mid").innerHTML = cities;
  }
  if (count <= 4) {
    document.getElementById("button1").style.visibility = "hidden";
    document.getElementById("button2").style.visibility = "hidden";
  }
}

// SNOW FALL

function snow() {
  document.getElementById("sun").style.borderBottom = "none";
  document.getElementById("snow").style.borderBottom = "2.5px solid blue";
  document.getElementById("rain").style.borderBottom = "none";
  var keys = Object.keys(weatherData);
  var t,
    p,
    h,
    count = 0,
    time;
  var cities = ``;
  for (var k = 0; k < keys.length; k++) {
    t = parseInt(weatherData[keys[k]].temperature);
    p = parseInt(weatherData[keys[k]].precipitation);
    h = parseInt(weatherData[keys[k]].humidity);
    if (t > 20 && t < 28 && h > 50 && p < 50) {
      tdyDate = weatherData[keys[k]].dateAndTime;
      tdyDate = tdyDate.split(",", 1);
      time = weatherData[keys[k]].timeZone;
      var dates = new Date().toLocaleString("en-US", {
        timeZone: time,
        timeStyle: "medium",
        hourCycle: "h24",
      });

      var ampm = parseInt(dates.slice(0, 2));
      dates = dates.slice(0, 5);
      var day = ampm >= 12 ? "Pm" : "Am";
      var date = weatherData[keys[k]].dateAndTime;

      count++;
      cities += `<div class="img-1">
          <img class="main-img" src="Asset/${
            weatherData[keys[k]].cityName
          }.svg" />
          <div class="img-text">${weatherData[keys[k]].cityName}</div>
          <div class="img-icon">
            <img src="Asset/snowflakeIcon.svg" />&nbsp;
            <p>${weatherData[keys[k]].temperature}</p>
          </div>
          <div class="timeDate">
          <div>${dates + " " + day}</div>
          <div>${tdyDate}</div>
        </div>
          <div class="side-icon">
            <div>
              <img src="Asset//humidityIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
              <p>${weatherData[keys[k]].humidity}</p>
            </div>
           
            <div>
              <img src="Asset/precipitationIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
              <p>${weatherData[keys[k]].precipitation}</p>
            </div>
          </div>
        </div>`;
    }
    document.querySelector(".mid-mid").innerHTML = cities;
  }
  if (count < 4) {
    document.getElementById("button1").style.visibility = "hidden";
    document.getElementById("button2").style.visibility = "hidden";
  }
}

// RAINY

function rainy() {
  document.getElementById("sun").style.borderBottom = "none";
  document.getElementById("snow").style.borderBottom = "none";
  document.getElementById("rain").style.borderBottom = "2.5px solid blue";
  var keys = Object.keys(weatherData);
  var input_value = document.getElementById("input_box").value;
  var t,
    h,
    count = 0;
  var max = 0,
    time;
  var cities = ``;

  for (var k = 0; k < keys.length; k++) {
    count++;
    t = parseInt(weatherData[keys[k]].temperature);
    p = parseInt(weatherData[keys[k]].precipitation);
    h = parseInt(weatherData[keys[k]].humidity);
    if (t < 20 && h >= 50) {
      tdyDate = weatherData[keys[k]].dateAndTime;
      tdyDate = tdyDate.split(",", 1);
      time = weatherData[keys[k]].timeZone;
      var dates = new Date().toLocaleString("en-US", {
        timeZone: time,
        timeStyle: "medium",
        hourCycle: "h24",
      });

      var ampm = parseInt(dates.slice(0, 2));
      dates = dates.slice(0, 5);
      var day = ampm >= 12 ? "Pm" : "Am";
      var date = weatherData[keys[k]].dateAndTime;

      max += 1;
      if (max <= input_value && max > 3) {
        console.log(max);
        cities += `<div class="img-1">
          <img class="main-img" src="Asset/${
            weatherData[keys[k]].cityName
          }.svg" />
          <div class="img-text">${weatherData[keys[k]].cityName}</div>
          <div class="img-icon">
            <img src="Asset/rainyIcon.svg" />&nbsp;
            <p>${weatherData[keys[k]].temperature}</p>
          </div>
          <div class="timeDate">
          <div>${dates + " " + day}</div>
          <div>${tdyDate}</div>
        </div>
          <div class="side-icon">
            <div>
              <img src="Asset//humidityIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
              <p>${weatherData[keys[k]].humidity}</p>
            </div>
           
            <div>
              <img src="Asset/precipitationIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
              <p>${weatherData[keys[k]].precipitation}</p>
            </div>
          </div>
        </div>`;
      } else if (max <= 3) {
        console.log(max);
        cities += `<div class="img-1">
        <img class="main-img" src="Asset/${
          weatherData[keys[k]].cityName
        }.svg" />
        <div class="img-text">${weatherData[keys[k]].cityName}</div>
        <div class="img-icon">
          <img src="Asset/rainyIcon.svg" />&nbsp;
          <p>${weatherData[keys[k]].temperature}</p>
        </div>
        <div class="timeDate">
        <div>${dates + " " + day}</div>
          <div>${tdyDate}</div>
      </div>
        <div class="side-icon">
          <div>
            <img src="Asset//humidityIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
            <p>${weatherData[keys[k]].humidity}</p>
          </div>
          
          <div>
            <img src="Asset/precipitationIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
            <p>${weatherData[keys[k]].precipitation}</p>
          </div>
        </div>
      </div>`;
      }
    }
    document.querySelector(".mid-mid").innerHTML = cities;
  }
  if (input_value <= 4) {
    document.getElementById("button1").style.visibility = "hidden";
    document.getElementById("button2").style.visibility = "hidden";
  } else {
    document.getElementById("button1").style.visibility = "visible";
    document.getElementById("button2").style.visibility = "visible";
  }
}

// HORIZONTAL SCROLL BUTTON

function leftScroll() {
  const left = document.querySelector(".mid-mid");
  left.scrollBy(290, 0);
}
function rightScroll() {
  const right = document.querySelector(".mid-mid");
  right.scrollBy(-290, 0);
}
