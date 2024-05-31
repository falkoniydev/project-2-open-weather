import React from "react";
import { useWeather } from "../contexts/WeatherContext";
import { FaLocationDot } from "react-icons/fa6";

const Header = () => {
	const { resetToCurrentLocation } = useWeather();

	return (
		<header className="fixed top-0 left-0 right-0 z-[100] bg-[#000000cf] py-3">
			<div className="container flex items-center justify-between">
				<div className="flex items-center gap-2">
					<img src="/logo.png" alt="" width="100px" height="100px" />
				</div>
				<button onClick={resetToCurrentLocation} className="btn-reset flex items-center gap-2">
					<FaLocationDot />
					<span>Sizning joylashuvingiz</span>
				</button>
			</div>
		</header>
	);
};

export default Header;
