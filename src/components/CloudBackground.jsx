import React, { useEffect, useRef } from "react";
import "../styles/CloudBackground.css";

const CloudBackground = ({ children }) => {
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
			<div className="content">{children}</div>
		</div>
	);
};

export default CloudBackground;
