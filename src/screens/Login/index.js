import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, StatusBar, Dimensions } from 'react-native'
import RoundIconBtn from '../../components/RoundIconBtn';
import colors from '../../util/colors'

const Login = ({onFinish}) => {
  const [name, setName] = useState('');
  const handleOnChangeText = text => setName(text);
  
  const handleSubmit = async () => {
    const user = { name: name};
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if(onFinish) onFinish()
  };
  
  return (
    <>
    <StatusBar hidden/>
    <View style={styles.container}>
      <Text style={styles.textTitle}>Digite o seu nome para continuar</Text>
      <TextInput 
        value={name}
        onChangeText={handleOnChangeText}
        placeholder= 'Digite aqui o nome'
        style={styles.textInput}
        />
      <RoundIconBtn antIconName="rightcircle" onPress={handleSubmit}/>
    </View>
    </>
  )
}

const width = Dimensions.get('window').width - 50
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput:{
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.PRIMARY,
    width,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 15,
  },
  textTitle:{
    // alignSelf: 'flex-start',
    // paddingLeft: 25,
    marginBottom: 30,
    fontSize: 15,
    fontWeight: 'bold'
  }
})

export default Login;