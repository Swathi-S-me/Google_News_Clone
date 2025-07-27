import WeatherCard from "./WeatherCard";
import { useWeather } from "../../hooks/useWeather";
import * as S from "../../styles/sharedStyles";

export default function Weather() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const { data: weather, isLoading, isError } = useWeather(API_KEY);

  if (isError) return null;

  return (
    <div className={`${S.mt3} ${S.px4} min-h-[100px]`}>
      {isLoading || !weather ? (
        <div className="animate-pulse h-24 w-full rounded-lg bg-gray-200" />
      ) : (
        <WeatherCard weather={weather} />
      )}
    </div>
  );
}
