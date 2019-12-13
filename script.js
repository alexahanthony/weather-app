
var APIKey = "&appid=7999013877175215816d0873b0939d22";
var userInput;
var lat;
var lon;
var citiesArr = [];

//when search button is clicked, load info about city
function onLoad() {
  var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + userInput + "&units=imperial" + APIKey;
  var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + userInput + "&units=imperial" + APIKey;
  // var QueryURLUVIndex = "http://api.openweathermap.org/data/2.5/uvi?" + "&lat={lat}&lon={lon}" + APIKey;

//pull info from current weather API and append to page
  $.ajax({
    url: queryURLCurrent,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var icon = response.weather[0].icon
    var currentDate = moment().format("MM/DD/YYYY");
    console.log(currentDate);
    var weatherIcon = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    $(".city-date").html("<h5>" + currentDate + "</h5>");
    $(".current-weather-report").html("<h3>Current Weather Report<br><img src=" + weatherIcon + "></h3>");
    $(".city").html("<h5>City: " + response.name + "</h5>");
    $(".temp").html("<h5>Temperature: " + parseInt(response.main.temp) + " °F</h5>");
    $(".humidity").html("<h5>Humidity: " + parseInt(response.main.humidity) + "%</h5>");
    $(".wind").html("<h5>Wind Speed: " + parseInt(response.wind.speed) + "mph</h5>");
    $(".uv-index").html("<h5>UV Index: " + parseInt(response.main.feels_like) + "</h5>");
  })
//pull info from 5 day forcast API and append to page
  $.ajax({
    url: queryURLFiveDay,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    for (let i = 0; i < 5; i++) {
      var myDate = moment(response.list[i * 8].dt_txt).format("MM/DD/YYYY");
      var icon = response.list[i * 8].weather[0].icon;
      var weatherIcon = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      // var myIcon = $("#").attr('src', weatherIcon)
      var temp = response.list[i * 8].main.temp;
      var humidity = response.list[i * 8].main.humidity;
      $("#" + (i + 1)).html("<p>" + myDate + "</p><p><img src=" + weatherIcon + "></p><p>Temp: " + parseInt(temp) + "°F" + "</p><p>Humidity: " + humidity + "%" + "</p>");
    }
  })
}
//appends cities below search bar and turns them into buttons 
function addCities(userInput) {
  var tempCities = localStorage.getItem("City");
  if(tempCities != null) {
  citiesArr = tempCities.split(',');
  }
  if(userInput!='') {
    //makes it so that you can not get two buttons of the same city
    if(citiesArr.indexOf(userInput) === -1) {
      citiesArr.push(userInput);
      console.log("cities :" + citiesArr.join(", "))
      localStorage.setItem("City", citiesArr);
      loadCities();
    };
  };
};
//pulls cities from local storage so if page is refreshed, buttons stay on page
function loadCities() {
  var cityList = document.querySelector("#city-list");
  cityList.innerHTML = "";
  var tempCities = localStorage.getItem("City");
  if(tempCities != null) {
  citiesArr = tempCities.split(',');
  }
  for (let i = 0; i < citiesArr.length; i++) {
    var aButton = document.createElement("button");
    aButton.textContent = citiesArr[i];
    aButton.id = "cbutton";
    cityList.appendChild(aButton);
  };

};
//when city is entered, search button loads info to the page
  $(".waves-effect").on("click", function () {
    userInput = $("#input_text").val();
    addCities(userInput);
    onLoad();
  });
//listens for click on the city buttons that have been added after searched
  $("#city-list").on("click","button", function (event) {
    console.log("city");
      $(this);
      onLoad();
  });
//loads any cities from the search bar
  $(document).ready(function () {
    loadCities();
  });


    //TODO: cities that append need to work when clicked on
    //TODO: UV Index - replace "feels like"
    
  
