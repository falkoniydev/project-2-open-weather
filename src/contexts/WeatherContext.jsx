import React, { createContext, useState, useContext, useEffect } from "react";

const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

const WeatherProvider = ({ children }) => {
	const [city, setCity] = useState("");
	const [weather, setWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [location, setLocation] = useState({
		name: "",
		state: "",
		country: "",
	});
	const [mapLocation, setMapLocation] = useState({ lat: null, lon: null });
	const [error, setError] = useState("");
	const apiKey = "dbf41bf1010faed5ff639adbcac9439f"; // OpenWeather API kalitingizni bu yerga kiriting

	const fetchWeather = async (lat, lon) => {
		const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}&units=metric`;
		try {
			const response = await fetch(weatherUrl);
			const data = await response.json();
			setWeather(data.current);

			console.log(data); // Barcha ma'lumotlarni konsolga chiqarish

			const dailyWithHourly = data.daily.map((day) => {
				const hourlyForDay = data.hourly.filter(
					(hour) =>
						new Date(hour.dt * 1000).getDate() ===
						new Date(day.dt * 1000).getDate()
				);
				return { ...day, hourly: hourlyForDay };
			});

			setForecast(dailyWithHourly);
			setError("");
			setMapLocation({ lat, lon });
		} catch (error) {
			console.error("Weather API xatosi:", error);
			setError("Xato yuz berdi. Iltimos, qayta urinib ko'ring.");
		}
	};

	const fetchCityName = async (lat, lon) => {
		const reverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
		try {
			const response = await fetch(reverseGeocodingUrl);
			const data = await response.json();
			if (data.length > 0) {
				const { name, state, country } = data[0];
				setLocation({ name, state, country });
			} else {
				setLocation({ name: "Noma'lum joy", state: "", country: "" });
			}
		} catch (error) {
			console.error("Geocoding API xatosi:", error);
			setLocation({ name: "Noma'lum joy", state: "", country: "" });
		}
	};

	const handleSearch = async () => {
		const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
		try {
			const response = await fetch(geocodingUrl);
			const data = await response.json();
			if (data.length > 0) {
				const { lat, lon } = data[0];
				fetchWeather(lat, lon);
				fetchCityName(lat, lon); // Qidiruv orqali shahar nomini olish
			} else {
				setError("Shahar topilmadi.");
			}
		} catch (error) {
			console.error("Geocoding API xatosi:", error);
			setError("Xato yuz berdi. Iltimos, qayta urinib ko'ring.");
		}
	};

	const resetToCurrentLocation = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					fetchWeather(latitude, longitude);
					fetchCityName(latitude, longitude); // Joriy lokatsiyadan shahar nomini olish
				},
				(error) => {
					console.error("Geolokatsiya xatosi:", error);
					setError("Lokatsiyani olishga ruxsat berilmagan.");
				}
			);
		} else {
			setError("Geolokatsiya mavjud emas.");
		}
	};

	useEffect(() => {
		resetToCurrentLocation();
	}, []);

	return (
		<WeatherContext.Provider
			value={{
				city,
				setCity,
				weather,
				forecast,
				location,
				mapLocation,
				error,
				handleSearch,
				resetToCurrentLocation,
			}}>
			{children}
		</WeatherContext.Provider>
	);
};

export default WeatherProvider;
