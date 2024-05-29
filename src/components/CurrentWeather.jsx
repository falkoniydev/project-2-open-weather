import React from "react";
import { useWeather } from "../contexts/WeatherContext";
import { FaLocationDot } from "react-icons/fa6";

const CurrentWeather = () => {
	const { weather, location } = useWeather();
	if (!weather) return null;

	return (
		<div className="CurrentWeather bg-[#000000db] flex justify-between p-2">
			<div className="flex flex-col items-center justify-center gap-3">
				<div className="flex items-center gap-2">
					<span>
						<FaLocationDot />
					</span>
					<h2>Hozirgi ob-havo - {location}</h2>
				</div>
				<div className="flex items-center gap-3">
					{weather.weather[0].description.includes("clear") && (
						<img src="/sunny.png" alt="" width={250} height={200} />
					)}
					{weather.weather[0].description.includes("overcast clouds") && (
						<div className="relative">
							<img src="/sunny.png" alt="" width={200} />
							<img
								className="absolute bottom-0 w-[250px]"
								src="/cloud.png"
								alt=""
								width="200px"
							/>
						</div>
					)}
					{weather.weather[0].description.includes("rain") && (
						<img src="/rainy.png" alt="" />
					)}
					{weather.weather[0].description.includes("clouds") && (
						<img src="/cloud.png" alt="" width={300} />
					)}
					<div>
						<p>Harorat: {weather.temp}°C</p>
						<p>Ob-havo: {weather.weather[0].description}</p>
						<p>Namlik: {weather.humidity}%</p>
						<p>Shamol: {weather.wind_speed} m/s</p>
					</div>
				</div>
			</div>
			<div>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186904.71072550732!2d66.80307759875376!3d39.64057190046632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d191960077df7%3A0x487636d9d13f2f57!2sSamarkand%2C%20Samarqand%20Region%2C%20Uzbekistan!5e1!3m2!1sen!2s!4v1716985425220!5m2!1sen!2s"
					width="500"
					height="350"
					style={{ border: "none" }}
					allowfullscreen=""
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"></iframe>
			</div>
		</div>
	);
};

export default CurrentWeather;
