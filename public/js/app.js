const weatherForm = document.querySelector("form");
const userLocation = document.querySelector("input");

const cityMessage = document.querySelector("#city");
const weatherMessage = document.querySelector("#weather");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  cityMessage.textContent = "Loading..";

  const url =
    "http://localhost:3000/weather?location=" + userLocation.value + "";
  fetch(url).then((res) => {
    res.json().then((data) => {
      if (data.message) {
        return (cityMessage.textContent = data.message);
      }

      cityMessage.textContent = data.location;
      weatherMessage.textContent =
        "The temperature is : " +
        data.temp +
        ". There is a " +
        data.rain +
        "% chance of rain";
    });
  });
});
