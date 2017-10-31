import React, { Component } from 'react';
import Clock from './Clock';

import '../css/head.css';

const Head = () => {
	return (
		<header className="header-container">
			<p>Today's fine dust</p>
			<Clock />
		</header>
	);
}


export default Head;
