const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Path variables
const staticPath = path.join(__dirname, "/../public");
const viewsPath = path.join(__dirname + "/../templates/views");
const partialsPath = path.join(__dirname + "/../templates/partials");

// Setting express config
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setting static assets folder
app.use(express.static(staticPath));

// Setting routes
app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Aquib Ajani" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Here to help!",
    title: "Help page",
    name: "Aquib Ajani",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({ message: "Location not provided" });
  }

  geocode(req.query.location, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({ message: "Location not found" });
    }

    forecast(lat, lon, (error, { temp, rain } = {}) => {
      if (error) {
        return res.send({ message: "Something went wrong" });
      }

      res.send({
        location,
        temp,
        rain,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", { errorMessage: "Help article not found" });
});

app.get("*", (req, res) => {
  res.render("404", { errorMessage: "Page not found" });
});

app.listen(port, () => {
  console.log("Server is running on PORT " + port);
});
