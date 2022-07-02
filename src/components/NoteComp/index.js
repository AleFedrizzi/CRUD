import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import colors from '../../util/colors';

const NoteComp = ({item, onPress}) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  )
}

const width = Dimensions.get('window').width - 36

export default NoteComp

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.SECUNDARY,
    width: width /2 -10,
    padding: 8,
    borderRadius: 10,
  },
  title:{
    fontSize: 15,
    fontWeight: 'bold'
  }
})