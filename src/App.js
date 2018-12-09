import React, { Component } from 'react';
import snow from './icons/snowflake.png';
import cloud from './icons/cloud.png';
import rain from './icons/rain.png';
import sunny from './icons/sunny.png';
import windy from './icons/windy.png';
import './App.css';

class App extends Component {
  state = {
    long: '',
    lat: '',
    summary: '',
    temperature: '',
    icon: '',
    iconLogo: '',
    city: '',
    state: ''
  }

  componentDidMount(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({long: position.coords.longitude, lat: position.coords.latitude}, function(){
          fetch(`https://cors-anywhere.herokuapp.com/` + `https://nominatim.openstreetmap.org/reverse.php?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18`)
            .then(res => res.json())
            .then(data => this.setState({city: data.address.town, state: data.address.state}))
        })
        this.getWeather(position.coords.longitude, position.coords.latitude)
      });
    } else {
      console.log('GEOLOCATION IS NOT AVAILABLE')
    }
  }

  displayIcon(icon){
    if(icon === 'clear-day' || icon === 'clear-night'){
      this.setState({iconLogo: sunny})
    } else if(icon === 'rain') {
      this.setState({iconLogo: rain})
    } else if(icon === 'snow' || icon === 'sleet'){
      this.setState({iconLogo: snow})
    }else if(icon === 'wind') {
      this.setState({iconLogo: windy})
    } else {
      this.setState({iconLogo: cloud})
    }
  }
  getWeather(long, lat){
    const proxyUrl = "https://cors-anywhere.herokuapp.com/",
          targetUrl = `https://api.darksky.net/forecast/d3f7f07e93930037b1e70c5e761871e5/${lat},${long}`
    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(data => this.setState({summary: data.currently.summary, temperature: data.currently.temperature, icon: data.currently.icon}, this.displayIcon(data.currently.icon)))
  }

  render() {
    return (
      <div className="App">
        <div className="Aligner-item">
          <img src={this.state.iconLogo} alt="..."></img>
          <p>{this.state.city}, {this.state.state}</p>
          <p>{this.state.summary}</p>
          <p>{this.state.temperature} °F <br /> {Math.round(((this.state.temperature-32) * 5 / 9) * 100) / 100} °C</p>
        </div>
      </div>
    );
  }
}

export default App;
