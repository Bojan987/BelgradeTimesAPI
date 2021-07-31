import fetch from "node-fetch";
import geoip from "geoip-lite";

require("dotenv").config();

export const getWeather = async (request, response, next) => {
  const ipObject = geoip.lookup("77.46.215.138");
  const latitLongit = ipObject.ll;
  const lat = latitLongit[0];
  const lon = latitLongit[1];

  try {
    const api_key = process.env.WEATHER_API_KEY;
    const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}/?units=si`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    const weather = weather_data;
    const temp = weather.timezone.split("/");
    const city = temp[1];

    const zaokruzi = weather.currently.temperature;
    const round = Math.round(zaokruzi);

    const data = {
      timezone: city,
      icon: weather.currently.icon,
      temperature: round
    };
    response.json(data);
  } catch (err) {
    next(err);
  }
};
