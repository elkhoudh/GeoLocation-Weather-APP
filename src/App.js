import React, { Component } from 'react';
import snow from './icons/snowflake.png';
import './App.css';

class App extends Component {
  state = {
    long: '',
    lat: '',
    data: ''
  }

  componentDidMount(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({long: position.coords.longitude, lat: position.coords.latitude})
        this.getWeather(position.coords.longitude, position.coords.latitude)
      });
    } else {
      console.log('GEOLOCATION IS NOT AVAILABLE')
    }
  }

  getWeather(long, lat){
    const proxyUrl = "https://cors-anywhere.herokuapp.com/",
          targetUrl = `https://api.darksky.net/forecast/d3f7f07e93930037b1e70c5e761871e5/${lat},${long}`
    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(data => this.setState({data: data.currently}))
  }

  render() {
    return (
      <div className="App">
      <img src={snow} alt="..."></img>
        <p>{this.state.data.summary}</p>
        <p>{this.state.data.temperature}</p>
        <p>{this.state.data.icon}</p>
      </div>
    );
  }
}

export default App;
