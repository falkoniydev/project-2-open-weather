import React from "react";
import { useWeather } from "../contexts/WeatherContext";

const Search = () => {
	const { setCity, handleSearch } = useWeather();

	return (
		<div className="Search  flex items-center justify-center gap-3 mb-2">
			<input
				className="w-[600px] p-2 text-black"
				type="text"
				placeholder="Shahar nomini kiriting"
				onChange={(e) => setCity(e.target.value)}
			/>
			<button className="" onClick={handleSearch}>
				Qidirish
			</button>
		</div>
	);
};

export default Search;
