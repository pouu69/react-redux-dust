import React, { Component } from 'react';
import '../css/dustInfo.css';

const DustInfo = ({val, status, region}) => {

	const dustStatus = () => {
		if(status !== "N/A"){
			return (<img id="dust-status" src={require(`../assets/images/${status}.svg`)}/>)
		}
	}

	return (
		<div className="dust-info-container">
			{dustStatus()}
			<p id="dust-val">{val} <span>㎍/㎥</span></p>
			<p id="dust-region">{region}</p>
		</div>
	);
}


export default DustInfo;
