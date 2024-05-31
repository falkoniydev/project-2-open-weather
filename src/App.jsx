import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ForecastDetail from "./components/ForecastDetail";
import CloudBackground from "./components/CloudBackground";
import WeatherProvider from "./contexts/WeatherContext";
import Home from "./components/Home";

const App = () => {
	return (
		<WeatherProvider>
			<Router>
				<CloudBackground>
					<Header />
					<div className="container mt-[100px]">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/forecast/:dayId" element={<ForecastDetail />} />
						</Routes>
					</div>
				</CloudBackground>
			</Router>
		</WeatherProvider>
	);
};

export default App;
