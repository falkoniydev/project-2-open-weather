import React from "react";
import { useWeather } from "../contexts/WeatherContext";

const Error = () => {
	const { error } = useWeather();

	if (!error) return null;

	return (
		<div className="Error">
			<p>{error}</p>
		</div>
	);
};

export default Error;
