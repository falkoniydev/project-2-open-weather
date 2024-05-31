import React, { useEffect } from "react";
import { useWeather } from "../contexts/WeatherContext";
import { FaLocationDot } from "react-icons/fa6";

const CurrentWeather = () => {
	const { weather, location, mapLocation } = useWeather();
	if (!weather) return null;

	useEffect(() => {
		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDZYYvVXO8QPF5YTP2NFauY9SGlGsjStjc&callback=initMap`;
		script.async = true;
		document.body.appendChild(script);

		window.initMap = () => {
			const map = new window.google.maps.Map(document.getElementById("map"), {
				center: { lat: mapLocation.lat, lng: mapLocation.lon },
				zoom: 10,
			});

			const weatherLayer = new window.google.maps.ImageMapType({
				getTileUrl: function (coord, zoom) {
					return `https://tile.openweathermap.org/map/clouds_new/${zoom}/${coord.x}/${coord.y}.png?appid=dbf41bf1010faed5ff639adbcac9439f`;
				},
				tileSize: new window.google.maps.Size(256, 256),
				opacity: 0.5,
				name: "Weather",
			});

			map.overlayMapTypes.insertAt(0, weatherLayer);
		};

		return () => {
			document.body.removeChild(script);
		};
	}, [mapLocation]);

	return (
		<div className="CurrentWeather bg-[#000000db] flex justify-between p-2">
			<div className="flex flex-col justify-center gap-3">
				<div className="flex items-center gap-2 ps-4">
					<span>
						<FaLocationDot />
					</span>
					<h2>{`${location.name}, ${
						location.state ? location.state + ", " : ""
					}${location.country}`}</h2>
				</div>
				<div className="flex items-center gap-3">
					{weather.weather[0].description.includes("clear") && (
						<img src="/sunny.png" alt="" width={250} height={200} />
					)}
					{weather.weather[0].description.includes("rain") && (
						<img src="/rainy.png" alt="" />
					)}
					{weather.weather[0].description.includes("clouds") && (
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

					{weather.weather[0].description.includes("snow") && (
						<img src="/snow.png" alt="" width={300} />
					)}

					<div>
						<p>BUGUN</p>
						<p>Harorat: {weather.temp}°C</p>
						<p>
							Ob-havo:{" "}
							{/* {weather.weather[0].description.includes("clouds") &&
								"Biroz bulutli"} */}
							{weather.weather[0].description.includes(" clouds") && "Bulutli"}
							{weather.weather[0].description.includes("clear sky") && "Ochiq"}
							{weather.weather[0].description.includes("rain") && "Yomg'irli"}
						</p>
						<p>Namlik: {weather.humidity}%</p>
						<p>Shamol: {weather.wind_speed} m/s</p>
					</div>
				</div>
			</div>
			<div id="map" style={{ width: "500px", height: "350px" }}></div>
		</div>
	);
};

export default CurrentWeather;
