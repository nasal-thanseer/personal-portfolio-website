import { useState, useEffect } from "react";
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Sun, CloudSun } from "lucide-react";

type WeatherData = {
  temperature: number;
  condition: string;
  location: string;
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 35,
    condition: "Sunny",
    location: "Ajman, UAE"
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
      case "sunny":
        return <Sun className="h-6 w-6" />;
      case "partly cloudy":
        return <CloudSun className="h-6 w-6" />;
      case "cloudy":
      case "overcast":
        return <Cloud className="h-6 w-6" />;
      case "rain":
      case "showers":
        return <CloudRain className="h-6 w-6" />;
      case "drizzle":
        return <CloudDrizzle className="h-6 w-6" />;
      case "snow":
        return <CloudSnow className="h-6 w-6" />;
      default:
        return <CloudSun className="h-6 w-6" />;
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="text-4xl font-light">{weather.temperature}°C</div>
      <div className="flex items-center gap-2">
        {getWeatherIcon(weather.condition)}
        <div className="text-sm">
          <div>{weather.location}</div>
          <div className="text-gray-400">{weather.condition}</div>
        </div>
      </div>
    </div>
  );
}
