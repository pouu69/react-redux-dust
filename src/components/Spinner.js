import React, { Component } from 'react';
import '../css/spinner.css';

const Spinner = ({show}) => {
	return (
		<div className={`spinner-container ${(show ? 'show' : 'hidden')}`}>
			<div className="spinner">
			  <div className="rect1"></div>
			  <div className="rect2"></div>
			  <div className="rect3"></div>
			  <div className="rect4"></div>
			  <div className="rect5"></div>
			</div>		
		</div>
	);
}

export default Spinner;
