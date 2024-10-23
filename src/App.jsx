/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import WeatherInformations from "./components/WeatherInformations/WeatherInformations";
import WeatherInformations5Days from "./components/WeatherInformations5Days/WeatherInformations5Days";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [weather5Days, setWeather5Days] = useState();
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value.trim();

    if (!city) {
      setError("Por favor, insira o nome de uma cidade.");
      return;
    }

    const key = "7aaf81b1ef3b051b255cbafd6aa2f0d1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      setError(null); // Resetar o erro
      const apiInfo = await axios.get(url);
      const apiInfo5Days = await axios.get(url5Days);

      setWeather5Days(apiInfo5Days.data);
      setWeather(apiInfo.data);
    } catch (error) {
      setError("Cidade não encontrada ou erro na API.");
      setWeather(null); // Resetar o estado do clima
    }
  }

  return (
    <div className="container">
      <h1>Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder="Digite o nome da cidade" />
      <button onClick={searchCity}>Buscar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && <WeatherInformations weather={weather} />}
      {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
    </div>
  );
}

export default App;
