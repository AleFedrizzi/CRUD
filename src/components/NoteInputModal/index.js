import { StyleSheet, Text, View, Modal, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, {useState, useEffect} from 'react'
import colors from '../../util/colors';
import RoundIconBtn from '../RoundIconBtn';

const NoteInputModal = ({visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if(isEdit){
      setTitle(note.title)
      setDesc(note.desc)
    }
  }, [isEdit])

  const handleOnChangeText = (text, valueFor, ) => {
    if(valueFor === 'title') setTitle(text);
    if(valueFor === 'desc') setDesc(text);
  }

  const handleSubmit = () =>{
    if(!title.trim() && !desc.trim()) return onClose();

    if(isEdit){
      //para editar a nota
      onSubmit(title, desc, Date.now());
    } else{
      onSubmit(title, desc);
      setTitle('');
      setDesc('');
    }
    onClose();
  }

  const closeModal = () => {
    if(!isEdit){
      setTitle('');
      setDesc('');
    }
    onClose();
  }

  return (
  <>
    <StatusBar hidden />
    <Modal visible={visible} animationType='fade'>
      <View style={styles.container} >
      <TextInput 
        value={title}
        onChangeText={(text) => handleOnChangeText(text, 'title')}
        style={[styles.input, styles.title]} 
        placeholder="Titulo da nota"
      />
      <TextInput 
        value={desc}
        style={[styles.input, styles.descriptions]} 
        placeholder="Conteúdo da nota" 
        multiline 
        onChangeText={(text) => handleOnChangeText(text, 'desc')}
      />
      <View style={styles.btnContainer}>
        <RoundIconBtn 
          antIconName='checkcircle' 
          style={{marginRight: 20}} 
          onPress={handleSubmit}
        />
        {title.trim() || desc.trim() ? (
          <RoundIconBtn 
            antIconName='closecircle' 
            onPress={closeModal}
          />

        ) : null }
      </View>
      </View>
      <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>

    </Modal>
    </>
  );
}

export default NoteInputModal

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 18
  },
  input:{
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK
  },
  title:{
    height: 40,
    marginVertical: 20,
    fontWeight: 'bold'
  },
  descriptions:{
    height: 100,
    fontSize: 15
  },
  modalBG:{
    flex: 1,
    zIndex: -1,
  },
  btnContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20
  }
})