import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export default App = () => {
  const [city, setCity] = useState ('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '59acd3c1d43c4527b7e231739241902';
  
  const getWeather = async () => {
    try{
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`);
      const data = await res.json();
      setWeatherData(data);
    } catch (err){
      setError('Error finding weather data');
    }
  };

  useEffect(() => {
    city ? getWeather : setWeatherData(null);
  }, [city]);

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Weather app!</Text>
      <TextInput
      style={styles.textInput}
      placeholder='Enter city name'
      value={city}
      onChangeText={(text) => setCity(text)}
      />
      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text>Get Weather</Text>
      </TouchableOpacity>
      {error && <Text>{error}</Text>}
      {weatherData && (
        <View>
          <Text>City:{weatherData.location.name}</Text>
          <Text>Country:{weatherData.location.country}</Text>
          <Text>Temperature:{weatherData.current.temp_c}</Text>
          <Text>Condition:{weatherData.current.condition.text}</Text>
        </View>
      )}
    </View>
  );
}

const styles =StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: 'blue'
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    margin: 10,
    width: 200
  }, 
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  weatherData: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgreen',
    borderRadius: 5
  }
});