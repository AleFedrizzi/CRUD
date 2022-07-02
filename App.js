import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login'
import Note from './src/screens/Note';
import NoteDetail from './src/components/NoteDetail';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import NoteProvider from './src/context/NoteProvider';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if(result === null) return setIsAppFirstTimeOpen(true)

    setUser(JSON.parse(result))
    setIsAppFirstTimeOpen(false)
  };

  useEffect(() => {
    findUser();
  }, []);

  const renderNote = (props) => <Note {...props} user={user} />

  if(isAppFirstTimeOpen) return <Login onFinish={findUser} />
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator screenOptions={{headerTitle: '', headerTransparent: true}}>
          <Stack.Screen component={renderNote} name='Note'/>
          <Stack.Screen component={NoteDetail} name='NoteDetail'/>
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  )
}