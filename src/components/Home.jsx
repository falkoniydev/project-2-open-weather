import React from "react";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import Error from "./Error";

const Home = () => {
	return (
		<div className="mt-[100px]">
			<Error />
			<Search />
			<CurrentWeather />
			<Forecast />
		</div>
	);
};

export default Home;
