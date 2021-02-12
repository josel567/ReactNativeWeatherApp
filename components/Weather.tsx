
import React from 'react';
import {View, Text, StyleSheet, Dimensions, ImageBackground, ScrollView} from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { weatherConditions } from '../utils/WeatherConditions';
import {WeatherItem} from "./WeatherItem";

export interface WeatherProps {
    weather: {
        current: {
            dt: number,
            sunrise: number,
            sunset: number,
            temp: number,
            feels_like: number,
            pressure: number,
            humidity: number,
            dew_point: number,
            uvi: number,
            clouds: number,
            visibility: number,
            wind_speed: number,
            wind_deg: number,
            weather: [
                {
                    id: number,
                    main: string,
                    description: string,
                    icon: string
                }
            ]},
            daily: [{
                    dt: number,
                    sunrise: number,
                    sunset: number,
                    temp: {
                        day: number,
                        min: number,
                        max: number,
                        night: number,
                        eve: number,
                        morn: number
                    },
                    feels_like: {
                        day: number,
                        night: number,
                        eve: number,
                        morn: number
                    },
                    pressure: number,
                    humidity: number,
                    dew_point: number,
                    wind_speed: number,
                    wind_deg: number,
                    weather: [
                        {
                            "id": number,
                            "main": string,
                            "description": string,
                            "icon": string
                        }
                    ],
                    clouds: number,
                    pop: number,
                    uvi: number
                }]
    },
    city: string
}

export class Weather extends React.Component<WeatherProps, {}> {

    render() {

        return (
            <View style={[styles.weatherContainer, {backgroundColor: weatherConditions[this.props.weather.current.weather[0].main].color}]}>

                <ImageBackground source={weatherConditions[this.props.weather.current.weather[0].main].background} style={styles.image}>

                    <View style={styles.headerContainer}>
                        <Text style={{color: weatherConditions[this.props.weather.current.weather[0].main].color, marginBottom: 30, fontSize: 25, fontFamily: "SourceSansPro"}}>{this.props.city}</Text>
                        <Icon size={70} name={weatherConditions[this.props.weather.current.weather[0].main].icon} color={weatherConditions[this.props.weather.current.weather[0].main].color}/>
                        <Text style={[styles.tempText, {color: weatherConditions[this.props.weather.current.weather[0].main].color}]}>{Math.floor(this.props.weather.current.temp)}˚c</Text>
                    </View>

                    <View style={styles.bodyContainer}>

                        <ScrollView
                            style={{display: "flex", flexDirection: "row"}}
                            contentContainerStyle={{justifyContent: "space-between"}}
                            horizontal={true}
                            scrollEventThrottle={16}
                            pagingEnabled={true}
                        >
                                <WeatherItem date={this.getDateString(this.props.weather.daily[1].dt)}
                                             weatherCondition={this.props.weather.daily[1].weather[0].main}
                                             maxTemp={Math.floor(this.props.weather.daily[1].temp.max)}
                                             minTemp={Math.floor(this.props.weather.daily[1].temp.min)}
                                />

                                <WeatherItem date={this.getDateString(this.props.weather.daily[2].dt)}
                                             weatherCondition={this.props.weather.daily[2].weather[0].main}
                                             maxTemp={Math.floor(this.props.weather.daily[2].temp.max)}
                                             minTemp={Math.floor(this.props.weather.daily[2].temp.min)}
                                />

                                <WeatherItem date={this.getDateString(this.props.weather.daily[3].dt)}
                                             weatherCondition={this.props.weather.daily[3].weather[0].main}
                                             maxTemp={Math.floor(this.props.weather.daily[3].temp.max)}
                                             minTemp={Math.floor(this.props.weather.daily[3].temp.min)}
                                />

                                <WeatherItem date={this.getDateString(this.props.weather.daily[4].dt)}
                                             weatherCondition={this.props.weather.daily[4].weather[0].main}
                                             maxTemp={Math.floor(this.props.weather.daily[4].temp.max)}
                                             minTemp={Math.floor(this.props.weather.daily[4].temp.min)}
                                />

                                <WeatherItem date={this.getDateString(this.props.weather.daily[5].dt)}
                                             weatherCondition={this.props.weather.daily[5].weather[0].main}
                                             maxTemp={Math.floor(this.props.weather.daily[5].temp.max)}
                                             minTemp={Math.floor(this.props.weather.daily[5].temp.min)}
                                />

                                <WeatherItem date={this.getDateString(this.props.weather.daily[6].dt)}
                                             weatherCondition={this.props.weather.daily[6].weather[0].main}
                                             maxTemp={Math.floor(this.props.weather.daily[6].temp.max)}
                                             minTemp={Math.floor(this.props.weather.daily[6].temp.min)}
                                />

                        </ScrollView>

                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, {color: weatherConditions[this.props.weather.current.weather[0].main].color}]}>{weatherConditions[this.props.weather.current.weather[0].main].title}</Text>
                        <Text style={[styles.subtitle, {color: weatherConditions[this.props.weather.current.weather[0].main].color}]}>{weatherConditions[this.props.weather.current.weather[0].main].subtitle}</Text>
                    </View>

                </ImageBackground>

            </View>
        );
    }

    getDateString(datetime) {
        const d = new Date(datetime * 1000);

        return `${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()}`;
    }
}

const {width, height} = Dimensions.get("screen");

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        backgroundColor: '#f7b733',
        width,
        height
    },
    headerContainer: {
        marginTop: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyContainer: {
        marginTop: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: "wrap",
        flexDirection: "row"
    },
    tempText: {
        fontSize: 60,
        color: '#fff',
        fontFamily: "SourceSansPro"
    },
    titleContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 35,
        fontFamily: "SourceSansPro"
    },
    subtitle: {
        fontSize: 20,
        color: '#fff',
        fontFamily: "SourceSansPro"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
});
