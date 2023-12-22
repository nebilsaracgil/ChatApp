import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GigaChad from './Screens/GigaChad';
import Chat_1 from './Screens/BasedSigma';
import Chat from './Components/Chat';


const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Based Sigma')} style={{ width: '100%', borderRadius: 10, marginBottom: 10, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <Text style={{ fontSize: 20 }}>Chat_1(name)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('GigaChad')} style={{ width: '100%', borderRadius: 10, marginBottom: 10, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <Text style={{ fontSize: 20 }}>GigaChad</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='ChatApp'>
    <Stack.Screen name="ChatApp" component={HomeScreen} />
    <Stack.Screen name="Based Sigma" component={Chat_1} />
    <Stack.Screen name="GigaChad" component={GigaChad} />
  </Stack.Navigator>
  </NavigationContainer>
  )
};