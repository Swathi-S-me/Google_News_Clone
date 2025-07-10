import { useEffect, useState } from "react";
import type { WeatherInfo } from "../types/types";

export function useWeather(apiKey: string) {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`
        );
        const data = await res.json();
        setWeather(data);
      },
      (err) => {
        console.error("Location denied", err);
      }
    );
  }, [apiKey]);

  return weather;
}
