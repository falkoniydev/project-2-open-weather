import React from "react";
import { useParams } from "react-router-dom";
import { useWeather } from "../contexts/WeatherContext";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const ForecastDetail = () => {
	const { dayId } = useParams();
	const { forecast } = useWeather();

	if (!forecast) return null;

	const selectedDay = forecast.find((day) => day.dt === parseInt(dayId));

	if (!selectedDay) return <p>Ma'lumot topilmadi.</p>;

	const hourlyData = selectedDay.hourly ? selectedDay.hourly.map((hour) => ({
		time: new Date(hour.dt * 1000).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		}),
		temperature: hour?.temp,
		windSpeed: hour?.wind_speed,
		humidity: hour?.humidity,
	})) : [];

	return (
		<div className="ForecastDetail pt-[100px] ">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div className="bg-[#000000e5] text-white p-4 rounded-lg shadow-md ">
					<h1 className="text-xl font-bold mb-2 text-center">
						Umumiy ma'lumotlar
					</h1>
					<div className="flex flex-col md:flex-row items-center justify-center gap-2">
						<div>
							{selectedDay.weather[0].description.includes("clear") && (
								<img src="/sunny.png" alt="" width={250} height={200} />
							)}
							{selectedDay.weather[0].description.includes("clouds") && (
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
							{selectedDay.weather[0].description.includes("rain") && (
								<img src="/rainy.png" alt="" />
							)}
						</div>
						<div>
							<h2 className="text-xl font-bold mb-2">
								{new Date(selectedDay.dt * 1000).toLocaleDateString()}
							</h2>
							<p className="mb-2">
								<strong>Harorat:</strong> {selectedDay.temp.day}°C
							</p>
							<p className="mb-2">
								<strong>Ob-havo:</strong> {" "}
								{selectedDay.weather[0].description.includes(
									"overcast clouds"
								) && "Biroz bulutli"}
								{selectedDay.weather[0].description.includes(" clouds") &&
									"Bulutli"}
								{selectedDay.weather[0].description.includes("clear sky") &&
									"Ochiq"}
								{selectedDay.weather[0].description.includes("rain") &&
									"Yomg'irli"}
							</p>
							<p className="mb-2">
								<strong>Namlik:</strong> {selectedDay.humidity}%
							</p>
							<p className="mb-2">
								<strong>Shamol:</strong> {selectedDay.wind_speed} m/s
							</p>
						</div>
					</div>
				</div>
				<div className="bg-[#000000e4] text-white p-4 rounded-lg shadow-md">
					<h3 className="text-xl font-bold mb-2 text-center">
						Soatlik ma'lumotlar
					</h3>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={hourlyData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="time" stroke="#fff" tick={{ fill: "#fff" }} />
							<YAxis stroke="#fff" tick={{ fill: "#fff" }} />
							<Tooltip content={<CustomTooltip />} />
							<Legend />
							<Line
								type="monotone"
								dataKey="temperature"
								stroke="#ff7300"
								activeDot={{ r: 8 }}
							/>
							<Line type="monotone" dataKey="windSpeed" stroke="#387908" />
							<Line type="monotone" dataKey="humidity" stroke="#8884d8" />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default ForecastDetail;
