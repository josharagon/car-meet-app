import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  const [user, setUser] = useState({id: 69, name: 'Josh', car: {year: 2018, make: 'Ford', model: 'Fiesta', trim: 'ST', mods:{intake: {brand: 'injen', model: 'short ram', linK: null}, intercooler: {brand: 'whoosh', model: 'v1', linK: null}, turbo: {brand: 'garrett', model: '2860r gen ii', linK: null} } }, memberSince: new Date() })
    
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title={"Change Text"}/>
    </View>
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
