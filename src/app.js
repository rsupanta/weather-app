const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// URL, take request from URL, send response
app.get("", (req, res) => {
  // Render dynamic pages
  res.render("index", {
    title: "Weather",
    name: "Ragib Hasan",
  });
});

// Sending weather data as JSON to public
// Request quesry "address"
app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide a valid address...",
    });
  }

  // calling geocode from mapbox API
  // Destructing function : object locationData
  geocode(address, (error, { lattitude, longitude, locationName } = {}) => {
    if (error) {
      return res.send({ error });
    }

    // calling forecast from weatherstack API
    forecast(lattitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }

      // If everything is okay, this will send as JSON
      res.send({
        forecast,
        locationName,
        address,
      });
    });
  });
});

// 404 * url
app.get("*", (req, res) => {
  res.render("404");
});

// Server port
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
