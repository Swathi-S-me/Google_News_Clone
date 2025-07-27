import type { WeatherInfo } from "../../types/types";
import * as S from "../../styles/sharedStyles";

export default function WeatherCard({ weather }: { weather: WeatherInfo }) {
  return (
    <div
      className={`${S.flex} ${S.itemsCenter} ${S.bgWhite} ${S.shadow} ${S.px4} ${S.py3} ${S.roundedMd}`}
    >
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description || "Weather icon"}
        width={48}
        height={48}
        className={`${S.w12} ${S.h12} shrink-0`}
        decoding="async"
        fetchPriority="high"
      />
      <div className={S.ml3}>
        <h2 className={`${S.textXl} ${S.fontSemibold}`}>{weather.name}</h2>
        <p className={S.textGray600}>{weather.main.temp}°C</p>
      </div>
    </div>
  );
}
