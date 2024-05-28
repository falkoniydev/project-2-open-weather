import React from "react";
import { useWeather } from "../contexts/WeatherContext";

const Forecast = () => {
	const { forecast } = useWeather();

	if (!forecast) return null;

	return (
		<div className="">
			<h2>Prognoz</h2>
			<div className="flex gap-2">
				{forecast.slice(1, 6).map((day, index) => (
					<div key={index} className="Forecast-day w-[350px] bg-[#000000c9] p-2">
						<img src="/cloud.png" alt="" />
						<p>Kuni: {new Date(day.dt * 1000).toLocaleDateString()}</p>
						<p>Harorat: {day.temp.day}°C</p>
						<p>Ob-havo: {day.weather[0].description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Forecast;
