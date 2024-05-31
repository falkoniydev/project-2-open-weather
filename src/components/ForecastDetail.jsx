import React from "react";
import { useParams } from "react-router-dom";
import { useWeather } from "../contexts/WeatherContext";

const ForecastDetail = () => {
	const { dayId } = useParams();
	const { forecast } = useWeather();

	if (!forecast) return null;

	const selectedDay = forecast.find(day => day.dt === parseInt(dayId));

	if (!selectedDay) return <p>Ma'lumot topilmadi.</p>;

	return (
		<div className="ForecastDetail">
			<h2>{new Date(selectedDay.dt * 1000).toLocaleDateString()}</h2>
			<p>Harorat: {selectedDay.temp.day}°C</p>
			<p>Ob-havo: {selectedDay.weather[0].description}</p>
			<p>Namlik: {selectedDay.humidity}%</p>
			<p>Shamol: {selectedDay.wind_speed} m/s</p>

			<h3>Soatlik ma'lumotlar</h3>
			<div className="HourlyForecast">
				{selectedDay.hourly.map((hour, index) => (
					<div key={index} className="HourlyForecast-item">
						<p>{new Date(hour.dt * 1000).toLocaleTimeString()}</p>
						<p>Harorat: {hour.temp}°C</p>
						<p>Ob-havo: {hour.weather[0].description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ForecastDetail;
