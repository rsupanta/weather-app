const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const msgOne = document.querySelector("#msgOne");
const msgTwo = document.querySelector("#msgTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchElement.value;

  msgOne.classList.remove("alert-danger");
  msgTwo.classList.remove("alert-dark");
  msgOne.classList.add("alert-secondary");
  msgOne.textContent = "Searching.....";
  msgTwo.textContent = "";

  const weatherAPIURL = "/weather?address=" + location;

  fetch(weatherAPIURL).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.classList.remove("alert-dark");
        msgOne.classList.add("alert-danger");

        msgOne.textContent = data.error;
      } else {
        msgOne.classList.remove("alert-danger");
        msgOne.classList.remove("alert-secondary");

        msgOne.classList.add("alert-dark");
        msgTwo.classList.add("alert-dark");

        msgOne.textContent = `Location: ${data.locationName}`;
        msgTwo.textContent = `Weather: ${data.forecast}`;
      }
    });
  });
});
