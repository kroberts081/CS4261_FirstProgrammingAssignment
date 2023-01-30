import { View, Text, Alert, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

const openWeatherKey = '3fb1204a908e070c148a7260d919a34e';
//let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;
let url = `https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely&units=metric&appid=${openWeatherKey}`;

const Weather = () => {
  
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = async () => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      //setRefreshing(false);
      //return; 
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    //const response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&APPID=${openWeatherKey}&units=imperial`);
    const data = await response.json();
    //console.log(data);

    if (!response.ok) {
      Alert.alert('Error', 'Something went wrong');
    } else {
      setForecast(data);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    loadForecast();
  }, []);

  if(!forecast) {
    return(
      <SafeAreaView style={StyleSheet.loading}>
        <ActivityIndicator size='large'/>
      </SafeAreaView>
    );
  }

  const current = forecast.weather[0];

  return (
    <SafeAreaView style={StyleSheet.container}>
      <ScrollView
        refreshControl={
          <RefreshControl 
          refreshing={refreshing} 
          onRefresh={() => loadForecast()} />
        }
        style={{marginTop:50}}
        >
          <Text style ={styles.title}>
            Current Weather
            </Text> 
            <Text style={{alignItems:'center', textAlign:'center'}}>
              {forecast.name}
            </Text>
            <View style = {styles.current}>
              <Image 
              style = {styles.largeIcon}
              source={{
                uri:`http://openweathermap.org/img/wn/${current.icon}@4x.png`,
              }} />
              <Text style={styles.currentTemp}>
                {Math.round(forecast.main.temp)}°C
              </Text>
            </View>

            <Text style={styles.currentDescription}>
              {current.description}
            </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Weather

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor:'#ECDBBA'
  },
  title:{
    textAlign:'center',
    fontSize:36, 
    fontWeight:'bold',
    color:'#C84B31'
  },
  current:{
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
  },
  largeIcon:{
    width:300,
    height:250
  },
  currentTemp:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  },
  currentDescription:{
    width:'100%',
    fontSize:24,
    fontWeight:'200',
    textAlign:'center',
    marginBottom:5
  }
})