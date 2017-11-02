import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Head, DustInfo, RegionInput, Spinner } from '../components';

import * as dustActions from '../module/dust-saga';

import '../css/main.css';

class DustApp extends Component {
	constructor(props) {
		super(props);

		this.handleChangeRegion = this.handleChangeRegion.bind(this);
		this.fetchDust = this.fetchDust.bind(this);
	}

	handleChangeRegion(region) {
		if(!region || region === '') alert("지역을 입력하세요."); 
		else 						 this.fetchDust(region);
	}

	fetchDust(region) { 
		const { DustActions } = this.props;
		DustActions.requestFetchDust(region);
	}

	render() {
		const { dust, pending, failed, progress } = this.props;

		if(failed !== false){
			alert(failed.message);
		}

		return (
			<div className="app-container">
				<Head />
				<Spinner show={progress.isFetching}/>
				<DustInfo 
					val={dust.val} 
					region={dust.region} 
					status={dust.status} 
				/>
				<RegionInput onChangeRegion={this.handleChangeRegion} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	dust: state.dust.dust,
	progress: state.dust.progress,
	pending: state.dust.prending,
	failed: state.dust.failed
});

const mapDispatchToProps = (dispatch) => ({
	DustActions: bindActionCreators(dustActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DustApp);