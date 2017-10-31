import React, { Component } from 'react';
import '../css/regionInput.css';


class RegionInput extends React.PureComponent{
	constructor(props){
		super(props);

		this.handleClkBtn = this.handleClkBtn.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleKeyPress(e) {
		if(e.key === 'Enter'){
			e.preventDefault();
			
			this.handleClkBtn();
		}
	}

	handleClkBtn() {
		this.props.onChangeRegion(this.inputBox.value);
		this.inputBox.value = '';
	}

	render(){
		return (
			<div className="region-input-container" id="region">
				<div id="region-input">
					<input 
						ref={(input)=> this.inputBox = input} 
						onKeyPress={this.handleKeyPress} 
						type="text" name="regionname" placeholder="Type a City" 
					/>
				</div>
				<div className="region-controls">
					<div onClick={this.handleClkBtn}><span>Click</span></div>
				</div>
			</div>
		);
	}
}

export default RegionInput;
