import React, { useEffect, useRef } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/CloudBackground.css";
import Header from "./Header";
import Search from "./Search";
import Error from "./Error";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

const CloudBackground = () => {
	const videoRef = useRef(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.playbackRate = 0.9;
		}
	}, []);

	return (
		<div className="video-background">
			<video ref={videoRef} autoPlay muted loop className="video">
				<source src="/clouds.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="content container">
				<Header />
				<div className="pt-[100px]">
					<Search />
					<Error />
					<CurrentWeather />
					<Forecast />
				</div>
			</div>
		</div>
	);
};

export default CloudBackground;
