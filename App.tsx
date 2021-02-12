
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {Weather} from './components/Weather';
import {OPENWEATHER_API_KEY, GOOGLE_API_KEY} from './utils/ApiKeys';
import * as Font from 'expo-font';

export default class App extends React.Component {

  state = {
    isLoading: true,
    weather: {},
    city: '',
    error: ''
  }

  async componentDidMount() {

    await Font.loadAsync({
      SourceSansPro: require('./assets/fonts/SourceSansPro-Regular.ttf')
    })

    navigator.geolocation.getCurrentPosition(async position => {
          this.fetchWeather(position.coords.latitude, position.coords.longitude);
          await this.getCityName(position.coords.latitude, position.coords.longitude);
        },
        error => {
          this.setState({
            error: 'Error Getting Weather Conditions'
          });
        }
    );
  }

  fetchWeather(lat = 25, lon = 25): void {

    fetch(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${OPENWEATHER_API_KEY}&units=metric`
  )
        .then(res => res.json())
        .then(json => {
          this.setState({
            weather: json,
            isLoading: false
          });
        });

  }

  async getCityName(lat: number, long: number): Promise<void> {

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}`);
    const jsonAddress = await response.json();

    this.setState({
      city: jsonAddress.results[0].address_components[2].long_name
    });

  }

  render() {

    const {isLoading, weather, city} = this.state;

    return (
        <View style={styles.container}>
          {isLoading ? (
              <Image source={{uri: 'https://www.puntosdeventapanini.com/img/material-loader.gif'}} style={styles.image}/>
          ): (
              <Weather
                weather={weather}
                city={city}
              />
          )}
        </View>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 200
  }
});
