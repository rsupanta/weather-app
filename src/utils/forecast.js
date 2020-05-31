const request = require("postman-request");
const apiKey = require("./forecastKey");

// WeatherStack API to fetch weather data by giving geo coordinate
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    apiKey +
    "=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  // Using destruction function
  request({ url, json: true }, (error, { body }) => {
    if (error)
      callback(
        "Unable to fetch forecast! Please check your internet connection....",
        undefined
      );
    else if (body.location.country === null || body.error)
      callback(
        "Sorry, given location weather data is not available!",
        undefined
      );
    else {
      // Object destructruction function
      const { temperature, feelslike, weather_descriptions } = body.current;

      callback(
        undefined,
        `${weather_descriptions}. It's currently ${temperature} degree out. But it feels like ${feelslike} degree.`
      );
    }
  });
};

module.exports = forecast;
