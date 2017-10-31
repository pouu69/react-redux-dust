import React, { Component } from 'react';
import moment from 'moment';


class CityRow extends Component {
  constructor(prop){
    super(prop);

    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }
  setTime(){
    let currentdate = new Date();
    let hours = currentdate.getUTCHours() + parseInt(9);    

    if( hours >= 24 ){ hours -= 24; }
    if( hours < 0   ){ hours += 12; }

    hours = hours + "";

    if( hours.length == 1 ){ hours = "0" + hours; }

    let minutes = currentdate.getUTCMinutes() + "";
    if( minutes.length == 1 ){ minutes = "0" + minutes; }

    let seconds = currentdate.getUTCSeconds();

    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }

  componentWillMount(){
    this.setTime();
  }

  componentDidMount(){
     window.setInterval(()=>{
      this.setTime();
    }, 1000);
  }
  
  render() {
    return(
      <div className="city-row" ref="cityRow">
        {moment().format('YYYY-MM-DD')}&nbsp;&nbsp;<span className="city-time">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</span>
      </div>
    )
  }

}

export default CityRow;