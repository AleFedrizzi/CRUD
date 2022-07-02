import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import colors from '../../util/colors'

const NotFound = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <AntDesign name='frowno' size={90} color={colors.DARK} />
      <Text style={{marginTop: 20, fontSize: 15}}>Nenhuma nota encontrada</Text>
    </View>
  )
}

export default NotFound

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    zIndex: -1
  }
})