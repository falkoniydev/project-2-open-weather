import React from "react";
import { useWeather } from "../contexts/WeatherContext";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
	const { resetToCurrentLocation } = useWeather();

	return (
		<header className="fixed top-0  left-0 right-0 z-[100] bg-[#000000cf] py-3">
			<Link to="/" className="container flex items-center justify-between">
				<div className="flex items-center">
					<img src="/logo.png" alt="" width="100px" height="100px" />
				</div>
				<button
					onClick={resetToCurrentLocation}
					className="btn-reset flex items-center max-sm:gap-0 gap-0">
					<FaLocationDot />
					<span className="max-sm:hidden max-md:hidden">
						Sizning joylashuvingiz
					</span>
					<span className="hidden max-sm:block">Joylashuvingiz</span>
				</button>
			</Link>
		</header>
	);
};

export default Header;
