const request = require("request");

const geocode = (location, callback) => {
  const url =
    "https://geocode.maps.co/search?city=" + encodeURIComponent(location) + "";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to get weather");
    } else if (body.length === 0) {
      callback("Unable to find location");
    } else {
      callback(undefined, {
        lat: body[0].lat,
        lon: body[0].lon,
        location: location,
      });
    }
  });
};

module.exports = geocode;
