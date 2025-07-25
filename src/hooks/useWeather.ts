// import { useEffect, useState } from "react";
// import type { WeatherInfo } from "../types/types";

// export function useWeather(apiKey: string) {
//   const [weather, setWeather] = useState<WeatherInfo | null>(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async ({ coords }) => {
//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`
//         );
//         const data = await res.json();
//         setWeather(data);
//       },
//       (err) => {
//         console.error("Location denied", err);
//       }
//     );
//   }, [apiKey]);

//   return weather;
// }


// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import type { WeatherInfo } from "../types/types";

// export function useWeather(apiKey: string) {
//   const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       ({ coords }) => {
//         setCoords({ lat: coords.latitude, lon: coords.longitude });
//       },
//       (err) => {
//         console.error("Location denied", err);
//       }
//     );
//   }, []);

//   const {
//     data: weather,
//     isLoading,
//     error,
//   } = useQuery<WeatherInfo>({
//     queryKey: ["weather", coords?.lat, coords?.lon],
//     queryFn: async () => {
//       if (!coords) throw new Error("No coordinates");
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}`
//       );
//       return res.json();
//     },
//     enabled: !!coords, // Only fetch when coords is set
//     staleTime: 1000 * 60 * 5, // Optional: cache for 5 minutes
//     retry: 1,
//   });

//   return weather;
// }




import { useQuery } from "@tanstack/react-query";
import type { WeatherInfo } from "../types/types";

const fetchWeather = async (apiKey: string): Promise<WeatherInfo> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`
          );
          const data = await res.json();
          resolve(data);
        } catch (err) {
          reject("Weather API failed");
        }
      },
      () => {
        reject("Geolocation error");
      }
    );
  });
};

export function useWeather(apiKey: string) {
  return useQuery({
    queryKey: ["weather"],
    queryFn: () => fetchWeather(apiKey),
    staleTime: 1000 * 60 * 5, 
  });
}
