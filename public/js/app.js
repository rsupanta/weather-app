const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const msgOne = document.querySelector("#msgOne");
const msgTwo = document.querySelector("#msgTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchElement.value;
  msgOne.textContent = "Searching.....";
  msgTwo.textContent = "";

  const weatherAPIURL = "http://localhost:3000/weather?address=" + location;

  fetch(weatherAPIURL).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.classList.add("alert");
        msgOne.classList.add("alert-danger");
        msgOne.textContent = data.error;
      } else {
        msgOne.classList.remove("alert");
        msgOne.classList.remove("alert-danger");
        msgOne.textContent = `Location: ${data.locationName}`;
        msgTwo.textContent = `Weather: ${data.forecast}`;
      }
    });
  });
});
