import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import colors from '../../util/colors'

export default function RoundIconBtn({antIconName, size, color, style, onPress}) {
  return <AntDesign 
    name={antIconName} 
    size={size || 24} 
    color={color || colors.LIGHT}  
    style={[styles.icon, {...style}]}
    onPress={onPress}
  />
}

const styles = StyleSheet.create({
  icon:{
    color: colors.PRIMARY,
    padding: 15,
    fontSize: 40,
    elevation: 5,
  }
})
