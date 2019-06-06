import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Modal } from 'react-native';

//Styles for modal
const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#000'
  },
  contentContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'green'
  },
  infoContainer: {
    width: '100%',
    height: 200,
    padding: 15,
    backgroundColor: '#fff'
  },
  infoText: {
    color: '#000',
    fontSize: 16
  },
  buttonContainer:{
    flexDirection: 'row',
    height: 50,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  darkBackgroundText: {
    color: '#fff',
    fontSize: 16
  }
});

const LongPressModal = (props) => {
  // all props
  const {selectedActivites, modalShow, onHideModal, onDeleteActivites} = props;
  // selectedActivite
  const {_id, sport, douleurAvant, douleurApres,zoneDouleurAvant, zoneDouleurApres, nbKilometre,duree, date, heure} = selectedActivites
  return (
    <Modal 
      animationType="slide" 
      transparent={false} 
      visible={modalShow} 
      onRequestClose={onHideModal}
    >

      <View style={styles.modalContainer} opacity={0.85}>
        <View style={styles.contentContainer} opacity={1}>
          <View style={styles.header}>
            <Text style={styles.darkBackgroundText}>{sport}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={[styles.infoText, {fontWeight: 'bold'}]}>Niveau de Douleur Avant:</Text>
              <Text style={styles.infoText}>{` ${douleurAvant}`}</Text>  
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.infoText, {fontWeight: 'bold'}]}>Zone de douleur avant:</Text>
              <Text style={styles.infoText}>{` ${zoneDouleurAvant}`}</Text>
            </View>
            
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.infoText, {fontWeight: 'bold'}]}>Niveau de Douleur Apres:</Text>
              <Text style={styles.infoText}>{` ${douleurApres}`}</Text>
            </View>
            
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.infoText, {fontWeight: 'bold'}]}>Zone de douleur après:</Text>
              <Text style={styles.infoText}>{` ${zoneDouleurApres}`}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.infoText, {fontWeight: 'bold'}]}>Objectif:</Text>
              <Text style={styles.infoText}>{` ${nbKilometre}`}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.infoText, {fontWeight: 'bold'}]}>Durée:</Text>
              <Text style={styles.infoText}>{` ${duree}`}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.infoText, {fontWeight: 'bold'}]}>Date:</Text>
              <Text style={styles.infoText}>{` ${date}`}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.infoText, {fontWeight: 'bold'}]}>Heure:</Text>
              <Text style={styles.infoText}>{` ${heure}`}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onHideModal} style={[styles.button, {backgroundColor: '#393939'}]}>
              <Text style={styles.darkBackgroundText}>Exit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDeleteActivites(_id)} style={[styles.button, {backgroundColor: '#EF233C'}]}>
              <Text style={styles.darkBackgroundText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </Modal>
  );
};

export default LongPressModal;