import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import {useHeaderHeight} from '@react-navigation/stack'
import colors from '../../util/colors'
import RoundIconBtn from '../RoundIconBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNotes } from '../../context/NoteProvider'
import NoteInputModal from '../NoteInputModal'

const formtDate = ms => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hrs = date.getHours()
  const min = date.getMinutes()
  // const sec = date.getMilliseconds()
  return `${day}/${month}/${year} - ${hrs}:${min}`
}
const NoteDetail = props => {
  const [note, setNote] = useState(props.route.params.note)
  const headerHeight = useHeaderHeight();
  const {setNotes} = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  //Função para apagar a note
  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes')
    let notes = []
    if(result !== null) notes = JSON.parse(result)
    const newNotes = notes.filter(n => n.id !== note.id)
    setNotes(newNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    props.navigation.goBack()
  }

  //Função de alerta para para confirmar se vai apagar a nota
  const displayDeleteAlert = () => {
    Alert.alert('Você tem certeza?', 'Você vai apagar esta nota para sempre!',[
      {
        text: 'Apagar',
        onPress: deleteNote
      },
      {
        text: 'Não obrigado',
        onPress: () => console.log('Não vou mais apagar nada')
      }
    ], {
      cancelable: true
    })
  }

  const handleUpdate = async (title, desc, time) => {
    const result =await AsyncStorage.getItem('notes')
    let notes = [];
    if(result !== null) notes = JSON.parse(result)

    const newNotes = notes.filter(n => {
      if(n.id === note.id){
        n.title = title
        n.desc = desc
        n.isUpdate = true
        n.time = time;

        setNote(n)
      }
      return n;
    })

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
  }
  const handleOnClose = () => setShowModal(false)
  const openEditModal = () => {
    setIsEdit(true)
    setShowModal(true)
  }

  return (
    <ScrollView contentContainerStyle ={[styles.container, {paddingTop: headerHeight + 10}]}>
      <Text style={styles.date}>{note.isUpdate ? `Atualizado em ${formtDate(note.time)}` : `Criado em ${formtDate(note.time)}`}</Text>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.desc}>{note.desc}</Text>

      {/* Botão e função para deletar nota */}
      <View style={styles.btnContainer}>
        <RoundIconBtn 
          antIconName='delete'
          style={{color: colors.ERROR, marginBottom: 15, fontSize: 30 }}
          onPress={displayDeleteAlert}
          />
          {/* Botão e função para editar nota */}
        <RoundIconBtn 
          antIconName='edit'
          style={{color: colors.DARK, fontSize: 30 }}
          onPress={openEditModal}
        />
      </View>
      <NoteInputModal isEdit={isEdit} note={note} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} />
    </ScrollView>
  ) 
}

export default NoteDetail

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 18,
    marginRight: 20,
  },
  title:{
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.DARK
  },
  desc:{
    fontSize: 15,
    
  },
  date:{
    marginTop: 30,
    fontSize: 12,
    textAlign: 'right',
    opacity: .5,
  },
  btnContainer:{
    position: 'absolute',
    borderRadius: '50%',
    alignItems: 'flex-end',
    right: 18,
    bottom: 50
  }
})