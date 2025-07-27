import { useQuery } from "@tanstack/react-query";
import type { WeatherInfo } from "../types/types";

const fetchWeather = async (apiKey: string): Promise<WeatherInfo> => {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by this browser.");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch weather");
          }

          const data = await res.json();

          if (!data || !data.main || !data.weather) {
            throw new Error("Invalid weather response");
          }

          resolve(data);
        } catch (err) {
          reject(err instanceof Error ? err.message : "Weather API error");
        }
      },
      (geoErr) => {
        reject(geoErr.message || "Geolocation access denied");
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  });
};

export function useWeather(apiKey: string) {
  return useQuery({
    queryKey: ["weather"],
    queryFn: () => fetchWeather(apiKey),
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
