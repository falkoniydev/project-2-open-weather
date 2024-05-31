import React from "react";
import { useWeather } from "../contexts/WeatherContext";
import { Link } from "react-router-dom";

const Forecast = () => {
	const { forecast } = useWeather();

	if (!forecast) return null;

	console.log(forecast);

	return (
		<div
			className="pb-[50px]"
			style={{
				zIndex: "100",
			}}>
			<h2 className="py-2 my-2 text-center bg-[#000000ed]">
				5 kunlik ob-havo ma'lumoti
			</h2>
			<div className="flex gap-2 max-sm:flex-col ">
				{forecast.slice(1, 6).map((day, index) => (
					<Link
						to={`/forecast/${day.dt}`}
						key={index}
						className="Forecast-day w-[350px] max-sm:w-[320px] bg-[#000000c9] p-2 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
						<div className="w-[200px] h-[200px] flex items-center justify-center ">
							{day.weather[0].description.includes("clear") && (
								<img src="/sunny.png" alt="" width="150px" />
							)}
							{day.weather[0].description.includes("clouds") && (
								<div className="relative">
									<img src="/sunny.png" alt="" width="150px" />
									<img
										className="absolute bottom-0 w-[250px]"
										src="/cloud.png"
										alt=""
										width="200px"
									/>
								</div>
							)}
							{day.weather[0].description.includes("rain") && (
								<img src="/rainy.png" alt="" />
							)}
							{/* {day.weather[0].description.includes("clouds") && (
								<img src="/cloud.png" alt="" className="mb-1" />
							)} */}
						</div>

						<p>Kuni: {new Date(day.dt * 1000).toLocaleDateString()}</p>
						<p>Harorat: {day.temp.day}°C</p>
						<p>
							Ob-havo:{" "}
							{day.weather[0].description.includes("clouds") && "Bulutli"}
							{day.weather[0].description.includes("clear sky") && "Ochiq"}
							{day.weather[0].description.includes("rain") && "Yomg'irli"}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Forecast;
