document.addEventListener("DOMContentLoaded", () => {
  const getweatherbtn = document.getElementById("get-weather-btn");
  const cityinput = document.getElementById("city-input");
  const weatherinfo = document.getElementById("weather-info");
  const Citynamedisplay = document.getElementById("City-name");
  const temperaturedisplay = document.getElementById("temperature");
  const Descriptiondisplay = document.getElementById("Description");
  const errormessage = document.getElementById("error-message");
  const API_KEY = "bbc0e060770d9a2aaadd438b5e94b26e";

  getweatherbtn.addEventListener("click", async () => {
    const cityname = cityinput.value.trim();
    if (!cityname) return;
    try {
      const weatherdata = await fetchweatherdata(cityname);
      displayweatherdata(weatherdata);
    } catch (error) {
      console.log(error);
      showerror();
      console.log("error");
    }
    cityinput.value = "";
  });
  async function fetchweatherdata(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }
  function displayweatherdata(weatherdata) {
    console.log(weatherdata);
    const { name, main, weather } = weatherdata;
    Citynamedisplay.textContent = name;
    temperaturedisplay.textContent = `Temperature: ${main.temp}`;
    Descriptiondisplay.textContent = `Weather: ${weather[0].description}`;
    weatherinfo.classList.remove("hidden");
    errormessage.classList.add("hidden");
  }
  function showerror() {
    weatherinfo.classList.add("hidden");
    errormessage.classList.remove("hidden");
  }
});
