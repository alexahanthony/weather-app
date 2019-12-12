var APIKey = "&appid=7999013877175215816d0873b0939d22";
var userInput;

function onLoad() { 
var queryURLCurrent = "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial" + APIKey;
var queryURLFiveDay = "http://api.openweathermap.org/data/2.5/forecast?" + "q=" + userInput + "&units=imperial" + APIKey;
$.ajax({
    url: queryURLCurrent,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $(".city").text("City: " + response.name);
    $(".temp").text("Temperature: " + parseInt(response.main.temp) + " °F");
    $(".humidity").text("Humidity: " + parseInt(response.main.humidity) + "%");
    $(".wind").text("Wind Speed: " + parseInt(response.wind.speed) + "mph");
    $(".uv-index").text("Feels like: " + parseInt(response.main.feels_like) + " °F");


  })

  $.ajax({
    url: queryURLFiveDay,
    method: "GET"
  }).then(function(response) {
    console.log(response)
 for (let i = 0; i < 5; i++) {
   var myDate = response.list[i*8].dt_txt;
   var icon = response.list[i*8].weather[0].icon;
   var temp = response.list[i*8].main.temp;
   var humidity = response.list[i*8].main.humidity;
   $("#" + (i + 1)).html("<p>" + myDate + "</p><p>" + icon + "</p><p>" + temp + "</p><p>" + humidity + "</p>");
 }
  })
}
//when city is entered 
  $(".waves-effect").on("click", function () {
    userInput = $("#input_text").val();
    console.log(userInput)
    onLoad();
    // localStorage.setItem(myValue, myInput)
  })


  // moment().subtract(10, 'days').calendar();


  //date, icon, temp, humidity