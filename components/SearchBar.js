import React, { useState } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const SearchBar = ({ fetchWeatherData }) => {
  const [cityName, setCityName] = useState("");
  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Enter City Name "
        value={cityName}
        onChangeText={(text) => setCityName(text)}
      />
      <EvilIcons
        name="search"
        size={28}
        color="black"
        onPress={() => fetchWeatherData(cityName)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    marginTop: 55,
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width - 20,
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "lightgray",
    borderColor: "lightgray",
  },
});
