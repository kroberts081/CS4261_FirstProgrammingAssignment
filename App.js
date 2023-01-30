import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Weather from './screens/Weather';
import NoteScreen from './screens/Notes'
import React from 'react';
import Header from './screens/Header';
import AddNotesScreen from './screens/AddNotes'

import { API_KEY } from './utils/WeatherAPIKey';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="Notes" component={NoteScreen} options={{
          headerTitle: () => <Header name="Notes"/>,
          headerStyle:{
            backgroundColor: '#03d3fc',
            height:120,
          }
          }}/>
        <Stack.Screen name="AddNotes" component={AddNotesScreen} options={{
          headerTitle: () => <Header name="Add Notes"/>,
          headerStyle:{
            backgroundColor: '#03d3fc',
            height:120,
          }
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
