import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {weatherConditions} from "../utils/WeatherConditions";

interface  WeatherItemProps {
    date: String,
    weatherCondition: string,
    maxTemp: number,
    minTemp: number
}

export class WeatherItem extends React.Component<WeatherItemProps, {}> {

    render() {
        return (
            <View style={styles.bodyItem}>
                <Text style={styles.bodyItemTitle}>{this.props.date}</Text>
                <Icon size={40} name={weatherConditions[this.props.weatherCondition].icon} color={weatherConditions[this.props.weatherCondition].color}/>
                <Text style={styles.bodyItemTemps}>{Math.floor(this.props.maxTemp)}ºc / {Math.floor(this.props.minTemp)}ºc</Text>
                <Text style={{color: 'white', fontFamily: "SourceSansPro"}}>max.       min.</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    bodyItem: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        width: 110,
        height: 140,
        padding: 5,
        alignItems: "center"
    },
    bodyItemTitle: {
        color: 'white',
        paddingLeft: 7,
        paddingRight: 7,
        marginBottom: 7,
        fontFamily: "SourceSansPro"
    },
    bodyItemTemps: {
        color: 'white',
        fontSize: 20,
        marginTop: 7,
        fontFamily: "SourceSansPro"
    }
});
