import React from "react";

const Header = () => (
	<header className="fixed top-0 left-0 right-0 z-auto bg-[#000000cf] py-3">
		<div className="container flex items-center justify-between">
			<div className="flex items-center gap-2">
				<img src="/logo.svg" alt="" width="50px" height="50px" />
				<span>Open Weather</span>
			</div>
			<h2>Find out the weather in your city</h2>
		</div>
	</header>
);

export default Header;
