import WeatherCard from "./WeatherCard";
import { useWeather } from "../../hooks/useWeather";
import * as S from "../../styles/sharedStyles";
export default function Weather() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const weather = useWeather(API_KEY);

  if (!weather) return null;

  return (
    <div className={`${S.mt3} ${S.px4}`}>
      <WeatherCard weather={weather} />
    </div>
  );
}
