import React from "react";

const Header = () => (
	<header className="fixed top-0 left-0 right-0 z-[100] bg-[#000000cf] py-3">
		<div className="container flex items-center justify-between">
			<div className="flex items-center gap-2">
				<img src="/logo.png" alt="" width="100px" height="100px" />
			</div>
			<h2>Find out the weather in your city</h2>
		</div>
	</header>
);

export default Header;
