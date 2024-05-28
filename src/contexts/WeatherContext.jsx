import React, { createContext, useState, useContext, useEffect } from "react";

const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

const WeatherProvider = ({ children }) => {
	const [city, setCity] = useState("");
	const [weather, setWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [location, setLocation] = useState(null); // Joriy lokatsiya shahar nomini saqlash uchun
	const [error, setError] = useState("");
	const apiKey = "dbf41bf1010faed5ff639adbcac9439f"; // OpenWeather API kalitingizni bu yerga kiriting

	const fetchWeather = async (lat, lon) => {
		const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;
		try {
			const response = await fetch(weatherUrl);
			const data = await response.json();
			setWeather(data.current);
			setForecast(data.daily);
			setError("");
		} catch (error) {
			setError("Xato yuz berdi. Iltimos, qayta urinib ko'ring.");
		}
	};

	const fetchCityName = async (lat, lon) => {
		const reverseGeocodingUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
		try {
			const response = await fetch(reverseGeocodingUrl);
			const data = await response.json();
			if (data.length > 0) {
				setLocation(data[0].name);
			} else {
				setLocation("Noma'lum joy");
			}
		} catch (error) {
			setLocation("Noma'lum joy");
		}
	};

	const handleSearch = async () => {
		const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
		try {
			const response = await fetch(geocodingUrl);
			const data = await response.json();
			if (data.length > 0) {
				const { lat, lon } = data[0];
				fetchWeather(lat, lon);
				setLocation(data[0].name); // Qidiruv orqali shahar nomini o'rnatish
			} else {
				setError("Shahar topilmadi.");
			}
		} catch (error) {
			setError("Xato yuz berdi. Iltimos, qayta urinib ko'ring.");
		}
	};

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					fetchWeather(latitude, longitude);
					fetchCityName(latitude, longitude); // Joriy lokatsiyadan shahar nomini olish
				},
				() => {
					setError("Lokatsiyani olishga ruxsat berilmagan.");
				}
			);
		} else {
			setError("Geolokatsiya mavjud emas.");
		}
	}, []);

	return (
		<WeatherContext.Provider
			value={{
				city,
				setCity,
				weather,
				forecast,
				location,
				error,
				handleSearch,
			}}>
			{children}
		</WeatherContext.Provider>
	);
};

export default WeatherProvider;
