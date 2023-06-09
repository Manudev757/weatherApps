fetch("http://localhost:2020/allTimeZone")
  .then((val) => val.text())
  .then((val) => val.replace(/�/g, "°"))
  .then((result) => JSON.parse(result))
  .then((data) => {
    let jsondata = {};
    for (const city of data) {
      jsondata[city.cityName.toLowerCase()] = city;
    }
    data = jsondata;
    console.log(data);
    let val = new Json_data(data);
    val.topSection();
    val.sortCities("sun");
    val.getWeather();
    val.continent("continent");
    val.getTime();
    setInterval(val.getTime.bind(val), 1000);
    // setInterval(val.getWeather.bind(val), 60000);
  });

window.setTimeout(function () {
  window.location.reload();
}, 60000);

/**
 * @class Json_data
 * @description This is a Parent Class contains Constructor function
 */
class Json_data {
  /**
   * Creates an instance of Json_data.
   * @param {Object} data
   * @description This constructor function initializes the variables that are used widely in other functions, it also creates an array with json object
   */
  constructor(data) {
    this.weatherData = data;
    this.selectedCity = "nome";
    this.b = true;
    this.val = "sun";
    (this.continents = false),
      (this.temperatures = true),
      (this.sortedArray = []);
    this.keys = Object.keys(data);
    this.weatherArray = [];
    for (const citykey of this.keys) {
      this.weatherArray.push(this.weatherData[citykey]);
    }
  }
  /**
   *@description displays all the city name on the datalist,contains all the Event Listeners on this project and also this function calls another function getWeather()
   * @memberof Json_data
   */
  topSection() {
    //setting the dropdown datalist
    let option = ``;
    for (let i = 0; i < this.keys.length; i++) {
      option += `<option value=${this.keys[i]}></option>`;
    }
    document.querySelector("#browsers").innerHTML = option;
    //adding Event Listeners to Buttons and Change elements
    document
      .getElementById("data")
      .addEventListener("input", this.inputCity.bind(this));
    document
      .getElementById("sun")
      .addEventListener("click", this.sortCities.bind(this, "sun"));
    document
      .getElementById("snow")
      .addEventListener("click", this.sortCities.bind(this, "snow"));
    document
      .getElementById("rain")
      .addEventListener("click", this.sortCities.bind(this, "rain"));
    document
      .getElementById("input_box")
      .addEventListener("change", this.sortCities.bind(this, "displayTop"));
    document
      .getElementById("sortTemperature")
      .addEventListener("click", this.continent.bind(this, "temperature"));
    document
      .getElementById("sortContinent")
      .addEventListener("click", this.continent.bind(this, "continent"));
    this.getWeather();
  }
  //Setting the top section weather and TimeLine for nxt 5 hrs
  /**
   *@description This function is a Asynchronous and send  multiple API request to the server to retrieve the next 5 hrs Weather of a city, It also sets the Current time and some weather data of the user selected city in the top section and it also Validates the Input box and the Top Section.
   * @memberof Json_data
   */
  async getWeather() {
    var cityName = this.weatherData[this.selectedCity];
    var nxt;
    var setTimeLine = ``;
    this.b = this.keys.includes(this.selectedCity);
    if (this.selectedCity === "") {
      document.getElementById("data").style.border = "2px solid red";
    }
    if (this.b) {
      let data = await fetch(
        `http://localhost:2020/city/${
          this.weatherData[this.selectedCity].cityName
        }`
      ).then((data) => data.json());
      let nxtHrs = await fetch("http://localhost:2020/hourlyForecast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          hours: 6,
        }),
      })
        .then((val) => val.text())
        .then((val) => val.replace(/�/g, "°"))
        .then((result) => JSON.parse(result));
      nxtHrs = await nxtHrs;
      document.getElementById("temp").innerHTML = cityName.temperature;
      document.getElementById("humid").innerHTML = cityName.humidity;
      document.getElementById("precipitation").innerHTML =
        cityName.precipitation;
      var f = parseInt(cityName.temperature);
      var farenheit = (f * 9) / 5 + 32;
      document.getElementById("fah").innerHTML = Math.round(farenheit) + " F";
      document.querySelector(
        ".grid-child-1"
      ).innerHTML = `<img id="bg-img" src="Asset/${this.selectedCity}.svg" width="90px" />`;
      var n = parseInt(this.getTime());
      n += 1;
      for (var t = -1; t < 5; t++) {
        if (n > 23) n = 0;
        nxt = t == -1 ? "Now" : parseInt(n++);
        setTimeLine += `
    <div class="weather-icon">
    <p id="time11">${nxt}</p>
    <br />
    <p>|</p>
    <br />
    <img id="w_icon" src="Asset/${
      t == -1
        ? this.nxtFiveHrs(parseInt(cityName.temperature))
        : this.nxtFiveHrs(parseInt(nxtHrs.temperature[t]))
    }.svg" /><br />
    <p id="nxtTime1">
    ${
      t == 4
        ? nxtHrs.temperature[4]
        : t != -1
        ? nxtHrs.temperature[t]
        : cityName.temperature
    }
      </p>
    <br />
    </div>
    <p>|</p>`;
      }
      document.querySelector(".flex-wrapper").innerHTML = setTimeLine;
      //Validatng the City Input Box - if correct City choosen
      document.getElementById("data").style.border = "none";
      document.getElementById("data").style.backgroundColor = "grey";
      var name = cityName.cityName.toLowerCase();
      document.querySelector(
        ".grid-child-1"
      ).innerHTML = `<img id="bg-img" src="Asset/${name}.svg" width="90px" />`;
    }
    //Validatng the City Input Box - if Invalid City choosen
    else {
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
  //set appropriate weather icon for the nxt 5 hrs
  /**
   * @param {temperature of a city for nxt 5 Hours} temp
   * @return {An Icon which matches the weather}
   * @description This function Returns a suitable weather icon for the specified temperature of a city
   * @memberof Json_data
   */
  nxtFiveHrs(temp) {
    let icon;
    if (temp > 29) icon = "sunnyIcon";
    else if (temp < 18) icon = "rainyIcon";
    else if (temp >= 23 && temp <= 29) icon = "precipitationIcon";
    else icon = "windyIcon";
    return icon;
  }
  //Calcualting the current Time and date for the choosen city
  /**
   * @return {current hour of the user selected city}
   * @description This Function Provides with the current time and Date for a selected city in the whole project
   * @memberof Json_data
   */
  getTime() {
    let city = this.weatherData[this.selectedCity];
    this.b = this.keys.includes(this.selectedCity);
    if (this.b) {
      var cityName = city.cityName;
      cityName = cityName.toLowerCase();
      const monthNames = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      const d = new Date();
      const date =
        d.getDate() + "-" + monthNames[d.getMonth()] + "-" + d.getFullYear();
      var tdyDate = this.weatherData[cityName].dateAndTime;
      tdyDate = tdyDate.split(",", 1);
      document.getElementById("tdyDate").innerHTML = date;
      var dates = new Date().toLocaleString("en-US", {
        timeZone: this.weatherData[this.selectedCity].timeZone,
        timeStyle: "medium",
        hourCycle: "h23",
      });
      //finding weather the time is AM or PM
      var ampm = parseInt(dates.slice(0, 2));
      dates = dates.slice(0, 8);
      var day = ampm >= 12 ? "pmState" : "amState";
      document.getElementById("time").innerHTML = `${dates}&nbsp;&nbsp;<img
            src="Asset/${day}.svg"
            />`;
      return dates.split(":")[0];
    }
  }
  /**
   *@description this Function gets the value[city name] from the user and also calls getWeather function
   * @memberof Json_data
   */
  inputCity() {
    this.selectedCity = document.getElementById("data").value.toLowerCase();

    this.getWeather();
  }
  //This function provides a sorted list of cities based on user preference
  /**
   * @param {Gets a string as an input which tells wheather user clicked sun / rain / snow icon in middle section} data
   * @description This Function sorts the city object by, wheather it is sunny/rainy/snowy and pushes it to a new array
   * @memberof Json_data
   */
  sort(data) {
    var i = 0;
    this.sortedArray = [];
    //if Suuny city selected by user
    if (data === "sun") {
      document.getElementById("sun").style.borderBottom = "2.5px solid blue";
      document.getElementById("snow").style.borderBottom = "none";
      document.getElementById("rain").style.borderBottom = "none";
      for (var k = 0; k < this.keys.length; k++) {
        var t = parseInt(this.weatherData[this.keys[k]].temperature);
        var p = parseInt(this.weatherData[this.keys[k]].precipitation);
        var h = parseInt(this.weatherData[this.keys[k]].humidity);
        if (t > 29 && h < 50 && p >= 50) {
          this.sortedArray[i] = this.weatherData[this.keys[k]];
          i++;
        }
      }
      this.sortedArray.sort((a, b) => {
        return parseInt(a.temperature) - parseInt(b.temperature);
      });
    }
    //if snow city selected by user
    if (data === "snow") {
      document.getElementById("sun").style.borderBottom = "none";
      document.getElementById("snow").style.borderBottom = "2.5px solid blue";
      document.getElementById("rain").style.borderBottom = "none";
      for (var k = 0; k < this.keys.length; k++) {
        t = parseInt(this.weatherData[this.keys[k]].temperature);
        p = parseInt(this.weatherData[this.keys[k]].precipitation);
        h = parseInt(this.weatherData[this.keys[k]].humidity);
        if (t > 20 && t < 28 && h > 50 && p < 50) {
          this.sortedArray[i] = this.weatherData[this.keys[k]];
          i++;
        }
      }
      this.sortedArray.sort((a, b) => {
        return parseInt(a.humidity) - parseInt(b.humidity);
      });
    }
    //if rainy city selected by user
    if (data === "rain") {
      document.getElementById("sun").style.borderBottom = "none";
      document.getElementById("snow").style.borderBottom = "none";
      document.getElementById("rain").style.borderBottom = "2.5px solid blue";
      for (var k = 0; k < this.keys.length; k++) {
        t = parseInt(this.weatherData[this.keys[k]].temperature);
        p = parseInt(this.weatherData[this.keys[k]].precipitation);
        h = parseInt(this.weatherData[this.keys[k]].humidity);
        if (t < 20 && h >= 50) {
          this.sortedArray[i] = this.weatherData[this.keys[k]];
          i++;
        }
      }
      this.sortedArray.sort((a, b) => {
        return parseInt(a.precipitation) - parseInt(b.precipitation);
      });
    }
  }
  //Displaying the sorted cities and Updating the Display spinner box
  /**
   * @param {Type contains the user clicked icon, ex sun / rain / snow} type
   * @return {if the value of input box is < 3 then it will return from the function}
   * @description This function displays the user selected city in mid-section according to the input value given by the user in display top box
   * @memberof Json_data
   */
  sortCities(type) {
    document.getElementById("sun").style.borderBottom = "2.5px solid blue";
    document.getElementById("snow").style.borderBottom = "none";
    document.getElementById("rain").style.borderBottom = "none";
    var input_box = document.getElementById("input_box").value;
    if (input_box < 3) {
      input_box.value = 3;
      return;
    }
    var cities = ``,
      ampm;
    if (type != "displayTop") {
      this.val = type;
    }
    this.sort(this.val);
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const d = new Date();
    const date =
      d.getDate() + "-" + monthNames[d.getMonth()] + "-" + d.getFullYear();
    for (var k = 0; k < this.sortedArray.length; k++) {
      var dates = new Date().toLocaleString("en-US", {
        timeZone: this.sortedArray[k].timeZone,
        timeStyle: "medium",
        hourCycle: "h23",
      });
      //finding weather the time is AM or PM
      dates = dates.slice(0, 5);
      ampm = dates.slice(0, 2);
      var day = ampm >= 12 ? "PM" : "AM";
      if (input_box > k) {
        cities += `<div class="img-1">
            <img class="main-img" src="Asset/${
              this.sortedArray[k].cityName
            }.svg" />
            <div class="img-text">${this.sortedArray[k].cityName}</div>
            <div class="img-icon">
              <img src="Asset/sunnyIcon.svg" />&nbsp;
              <p>${this.sortedArray[k].temperature}</p>
            </div>
            <div class="timeDate">
            <div>${dates + " " + day}</div>
            <div>${date}</div>
          </div>
            <div class="side-icon">
              <div>
                <img src="Asset//humidityIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
                <p>${this.sortedArray[k].humidity}</p>
              </div>
              <div>
                <img src="Asset/precipitationIcon.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
                <p>${this.sortedArray[k].precipitation}</p>
              </div>
            </div>
          </div>`;
        //making scroll buttons visble and hidden
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
  //Sorting cities in Bottom section
  /**
   * @param {sortKey conatins the value of button clicked by user in bottom section, ex: continent / temperature} sortKey
   * @description This Function sorts the bottom section cities by Continent wise or Temperature wise and displays it accordingly
   * @memberof Json_data
   */
  continent(sortKey) {
    const sortContinent = document.querySelector("#sortContinentImg");
    const sortTemperature = document.querySelector("#sortTemperatureImg");
    if (sortKey == "continent") {
      this.continents = !this.continents;
      sortContinent.src = `./Asset/arrow${this.continents ? "Up" : "Down"}.svg`;
    } else if (sortKey == "temperature") {
      this.temperatures = !this.temperatures;
      sortTemperature.src = `./Asset/arrow${
        this.temperatures ? "Up" : "Down"
      }.svg`;
    }
    let Cont_dir = this.continents ? 1 : -1;
    let Cont_temp = this.temperatures ? 1 : -1;
    this.weatherArray.sort((a, b) => {
      const cont_a = a.timeZone.split("/")[0];
      const cont_b = b.timeZone.split("/")[0];
      return (
        Cont_dir * cont_a.localeCompare(cont_b) ||
        Cont_temp * (parseInt(a.temperature) - parseInt(b.temperature))
      );
    });
    var data = ``,
      ampm;
    for (var i = 0; i < 12; i++) {
      var dates = new Date().toLocaleString("en-US", {
        timeZone: this.weatherArray[i].timeZone,
        timeStyle: "medium",
        hourCycle: "h23",
      });
      dates = dates.slice(0, 5);
      ampm = dates.slice(0, 2);
      var day = ampm >= 12 ? "PM" : "AM";
      data += `
              <div class="container">
              <div class="cont-1">
                <p>${this.weatherArray[i].timeZone.split("/")[0]}</p>
                <p>${this.weatherArray[i].temperature}</p>
              </div>
              <div class="cont-2">
                <p>${this.weatherArray[i].cityName}, ${dates + " " + day}</p>
                <img src="Asset/humidityIcon.svg" />
                <p>${this.weatherArray[i].humidity}</p>
              </div>
            </div>
              `;
    }
    document.querySelector(".bot-mid").innerHTML = data;
  }
}
/**
 *@description This Function makes a scroll left for about 150px
 */
function leftScroll() {
  const left = document.querySelector(".mid-mid");
  left.scrollBy(150, 0);
}
/**
 *@description This Function makes a scroll Right for about -150px
 */
function rightScroll() {
  const right = document.querySelector(".mid-mid");
  right.scrollBy(-150, 0);
}
