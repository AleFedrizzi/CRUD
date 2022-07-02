import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import colors from '../../util/colors'

// Função de busca
const SearchBar = ({containerStyle, value, onChangeText, onClear}) => {
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <TextInput value={value} onChangeText={onChangeText} style={styles.searchBarInput} placeholder='Digite a sua busca aqui...' />
      {value ? 
        <AntDesign name='close' 
        size={20} 
        color= {colors.PRIMARY} 
        onPress={onClear} 
        style={styles.clearIcon}
        /> : null}
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  searchBarInput:{
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 30
  },
  container:{
    // justifyContent: 'center'
  },
  clearIcon:{
    position: 'absolute',
    right: 10,
    paddingTop: 10
  }
})