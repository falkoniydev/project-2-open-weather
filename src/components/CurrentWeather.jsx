// import React from "react";
// import { useWeather } from "../contexts/WeatherContext";

// const CurrentWeather = () => {
// 	const { weather } = useWeather();

// 	if (!weather) return null;

// 	console.log(weather);

// 	return (
// 		<div className="CurrentWeather bg-[#000000db] flex ">
// 			<div>
// 				<img src="/logo.svg" alt="" width={200} />
// 			</div>
// 			<div>
// 				<h2>Hozirgi ob-havo</h2>
// 				<p>Harorat: {weather.temp}°C</p>
// 				<p>Ob-havo: {weather.weather[0].description}</p>
// 				<p>Namlik: {weather.humidity}%</p>
// 				<p>Shamol: {weather.wind_speed} m/s</p>
// 			</div>
// 		</div>
// 	);
// };

// export default CurrentWeather;

import React from "react";
import { useWeather } from "../contexts/WeatherContext";

const CurrentWeather = () => {
	const { weather, location } = useWeather();
	if (!weather) return null;

	return (
		<div className="CurrentWeather bg-[#000000db] flex ">
			<div>
				<img src="/logo.svg" alt="" width={200} />
			</div>
			<div>
				<h2>Hozirgi ob-havo - {location}</h2>
				<p>Harorat: {weather.temp}°C</p>
				<p>Ob-havo: {weather.weather[0].description}</p>
				<p>Namlik: {weather.humidity}%</p>
				<p>Shamol: {weather.wind_speed} m/s</p>
			</div>
		</div>
	);
};

export default CurrentWeather;
