import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Weather from "./components/Weather";
import SearchBar from "./components/SearchBar";

const apiKey = "18c0fcd463944b729a97e1d0cc91fa3d";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  async function fetchWeatherData(cityName) {
    setLoaded(true);
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(api);
      if (response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(false);
    } catch (error) {
      console.log(error);
    }
  }

useEffect(()=>{
  fetchWeatherData('cairo') ;
},[])

  if(loaded){
    return(
      <View style={styles.container }>
        <ActivityIndicator color='gray' size={36}/>
      </View>
    )
  }

  else if(weatherData === null) {
    return (
        <View style={styles.container}>
            <SearchBar fetchWeatherData={fetchWeatherData}/>
            <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
        </View>
    )
}

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
      margin: 20,
      fontSize: 28
  }
});
