const request = require("postman-request");
const apiKey = require("./geoKey"); //You can add your API key here

// Mapbox API to fetch geo coordinate by giving location
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${apiKey}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error)
      callback(
        "Unable to connect to location service! Please make sure internet connection is available.",
        undefined
      );
    else if (body.features.length === 0)
      callback(
        "Unable to find entered location. Please try another search!",
        undefined
      );
    else {
      callback(undefined, {
        locationName: body.features[0].place_name,
        lattitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
      });
    }
  });
};

module.exports = geocode;
