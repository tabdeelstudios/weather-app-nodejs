const request = require("request");

const forecast = (lat, lon, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=4d67306195958e2af1de33c2e5f1528f&query=" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(lon);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to get weather");
    } else if (body.length === 0) {
      callback("Unable to find location");
    } else {
      callback(undefined, {
        temp: body.current.temperature,
        rain: body.current.precip,
      });
    }
  });
};

module.exports = forecast;
