import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native";
import { haze, rainy, snow, sunny } from "../assets/backgroundImages/index";
import SearchBar from "./SearchBar";
import { StatusBar } from "expo-status-bar";

const Weather = ({ weatherData , fetchWeatherData }) => {
  const [backgroundImage, setBackGroundImage] = useState(null);


  const { weather,
    name,
    main: { temp, humidity },
    wind: { speed }
} = weatherData;
const [{ main }] = weather;

  useEffect(()=>{
    setBackGroundImage(getBackgroundImage(main))
  },[weatherData])

  function getBackgroundImage(weather) {
    if (weather === "Snow") return snow;
    if (weather === "Clear") return sunny;
    if (weather === "Rain") return rainy;
    if (weather === "Haze") return haze;
    return haze;
  }

  let textColor = backgroundImage !== sunny ? 'white' : 'black'

  return <View style={styles.container}>
    <ImageBackground  source={backgroundImage} style={styles.backgroundImg} resizeMode="cover">
        <StatusBar backgroundColor="darkgray"/>
        <SearchBar fetchWeatherData={fetchWeatherData}/>
        <View style={{alignItems:'center'}}>
            <Text style={{...styles.headerText , color : textColor , fontWeight : 'bold' , fontSize:46}}>{name}</Text>
            <Text style={{...styles.headerText , color : textColor , fontWeight : 'bold' }}>{main}</Text>
            <Text style={{...styles.headerText , color : textColor }}>{temp} °C</Text>
        </View>

        <View style={styles.extraInfo}>
         <View style={styles.info}>
            <Text style={{fontSize:22 ,color :'white'}}> Humidity</Text>
            <Text style={{fontSize:22 ,color :'white'}}> {humidity} %</Text>
         </View>
         <View style={styles.info}>
            <Text style={{fontSize:22 ,color :'white'}}> Wind Speed</Text>
            <Text style={{fontSize:22 ,color :'white'}}> {speed} m/s</Text>
         </View>
        </View>

    </ImageBackground>
  </View>;
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImg :{
    flex : 1 ,
    width:Dimensions.get('screen').width
  } ,
  headerText :{
    fontSize:36 , 
    marginTop:10 , 
  } , 
  extraInfo :{
    flexDirection : 'row' , 
    marginTop:20 , 
    justifyContent:'space-between' , 
    padding : 10
  } , 
  info :{
    width:Dimensions.get('screen').width/2.5 , 
    backgroundColor : 'rgba(0,0,0,0.5)' , 
    padding : 10 , 
    borderRadius : 15 , 
    justifyContent : 'center'
  }
  
});
