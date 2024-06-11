import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageBackground } from 'react-native';

export default App = () => {
  const [city, setCity] = useState (null);
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
      <ImageBackground source={require('./assets/img/fondo.jpg')} style={styles.backgroundImage}>
      <Text style={styles.title}>Weather App</Text>
      
      <Icon name="cloud-outline" size={30} color="#4F8EF7" />
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
          <Text style={styles.contenido}>City:{weatherData.location.name}</Text>
          <Text style={styles.contenido}>Country:{weatherData.location.country}</Text>
          <Text style={styles.contenido}>Temperature:{weatherData.current.temp_c}</Text>
          <Text style={styles.contenido}>Condition:{weatherData.current.condition.text}</Text>
          <Text style={styles.contenido}>Wind:{weatherData.current.wind_kph} kph</Text>
          <Text style={styles.contenido}>Humidity:{weatherData.current.humidity}</Text>
        </View>
      )}
      </ImageBackground>
     
    </View>
  );
}

const styles =StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BBE2EC',
    backgroundImage: 'url(${require("./assets/img/fondo.jpg")})',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: '#0D9276',
    paddingBottom: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    width: 200,
    borderRadius: 5
  }, 
  button: {
    backgroundColor: '#61A3BA',
    color: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  weatherData: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5
  },
  contenido: {
    fontSize: 18,
    margin: 5,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});