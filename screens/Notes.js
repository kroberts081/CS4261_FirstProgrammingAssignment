import { View, Text, Button, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import { firebase } from '../firebase'
import { FlashList } from '@shopify/flash-list'
import { StyleSheet } from 'react-native';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const navigation = useNavigation();

    const handleAdd = () => {
        navigation.navigate('AddNotes')
    }

    useEffect(() => {
        firebase.firestore()
        .collection('notes')
        .onSnapshot((querySnapshot) => {
            const newNotes = [];
            querySnapshot.forEach((doc) => {
                const{note, title} = doc.data();
                newNotes.push({note, title, id:doc.id});
            });
            setNotes(newNotes);
        })
    }, []);
  return (
    <View style={styles.container}>
      <FlashList 
        data={notes}
        numColumns={2}
        estimatedItemSize={100}
        renderItem={({item}) => (
            <View style={styles.noteView}>
                <Text style={styles.noteTitle}>
                    {item.title}
                </Text>
                <Text style={styles.noteDescription}>
                    {item.note}
                </Text>
            </View>
        )}
      />
      <TouchableOpacity
      style={styles.button}
      onPress={handleAdd}>
        <Text style={styles.buttonText}>
            Add Notes
        </Text>

      </TouchableOpacity>
    </View>
  )
}

export default Notes

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white'
    },
    button:{
        backgroundColor:'green',
        borderRadius:10,
        marginBottom:80,
        height:55,
        width:150,
        alignItems:'center',
        justifyContent:'center',
        elevation:7,
        shadowColor:'blue',
    },
    buttonText:{
        color:'white',
        fontSize:22,
        fontWeight:'bold'
    },
    noteView:{
        flex:1,
        backgroundColor:'white',
        margin:10,
        padding:10,
        borderRadius:10,
        shadowColor:'yellow',
        shadowOffset: { width:0, height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:7,
        alignItems:'center'
    },
    noteTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    noteDescription: {
        fontSize: 16, 
        marginTop:5
    }
})