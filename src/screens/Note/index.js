import React, {useState, useEffect, } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import colors from '../../util/colors'
import SearchBar from '../../components/SearchBar'
import RoundIconBtn from '../../components/RoundIconBtn'
import NoteInputModal from '../../components/NoteInputModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoteComp from '../../components/NoteComp'
import { useNotes } from '../../context/NoteProvider'
import NotFound from '../../components/NotFound'

// Para reverter a ordem das notas sendo o mais novos primeiro (Inclui alteracoes na nota)
const reverseDate = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const Note = ({user, navigation}) => {
  const [greet, setGreet] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false)

  const {notes, setNotes, findNotes } = useNotes()

  // funcão para verificar a hora e determinar a parte do dia
  const findGreet = () => {
    const hrs = new Date().getHours()
    if(hrs === 0 || hrs < 12) return setGreet('Bom dia');
    if(hrs === 1 || hrs < 17) return setGreet('Boa tarde');
    setGreet('Boa noite')
  };

  useEffect(() => {
    findGreet();
  }, []);

  const reverseNotes = reverseDate(notes);

  // Função para adicionar item
  const handleOnSubmit = async (title, desc) => {
    // const time = new Date().getTime()
    const note = {id: Date.now(), title: title, desc, time: Date.now()};
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
  }

  // Função para abrir a página de detalhe da nota 
  const openNote = (note) => {
    navigation.navigate('NoteDetail', {note})
  };

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if(!text.trim()){
      setSearchQuery('')
      setResultNotFound(false);
      return await findNotes()
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });
    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };
  
  const handleOnClear = async () => {
    setSearchQuery('')
    setResultNotFound(false)
    await findNotes()
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>{`${greet} ${user.name}`}</Text>
          {/* Função para fazer busca e se não tiver nota a busca não aparece */}
        {notes.length ? (
          <SearchBar 
            value={searchQuery} 
            onChangeText={handleOnSearchInput}
            onClear={handleOnClear}
          />) : null}
        {resultNotFound ? <NotFound /> : 
          <FlatList 
            data={reverseNotes}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15}}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <NoteComp onPress={() => openNote(item)} item={item} /> }
          />
        }

        {/* Se tiver notas não aparecer Adicione suas notas */}
        {!notes.length ? (
        <View 
          style={[StyleSheet.absoluteFillObject, 
          styles.emptyHeaderContainer,
          ]}>
          <Text style={styles.emptyHeader}>Adicione suas notas</Text>
        </View>
        ): null }
      </View>

      {/* Botão de adicionar */}
      </TouchableWithoutFeedback>
      <RoundIconBtn 
            antIconName='pluscircle' 
            style={styles.addBtn}
            onPress={() => setModalVisible(true)}
          />
      <NoteInputModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  )
}

export default Note

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 18,
    zIndex: 1,
  },
  header:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15
  },
  emptyHeaderContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
  },
  emptyHeader:{
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    opacity: 0.2,
  },
  addBtn:{
    position: 'absolute',
    right: 15,
    bottom: 50,
    zIndex: 10
  }
})