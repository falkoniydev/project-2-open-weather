import React from "react";
import WeatherProvider from "./contexts/WeatherContext";
import CloudBackground from "./components/CloudBackground";

const App = () => {
	return (
		<WeatherProvider>
			<CloudBackground />
		</WeatherProvider>
	);
};

export default App;
