import React from 'react';
import {View,Text,Picker,StyleSheet,TouchableHighlight} from "react-native";

//Styles
const styles = StyleSheet.create({
  list: {
    borderTopWidth: 0,
    padding: 15,
    marginTop: 0
  },
  listItem: {
    borderRadius: 5,
    borderColor: '#fff',
    borderBottomColor: '#fff',
    borderWidth: 2,
    margin: 10,
  },
  text: {
  	color: "#000"
  }
});

const SportList = (props) => {
  // props
  let { activite} = props;
  return (
      <Picker containerStyle={styles.list}>
        {activite.map(activites => {
          const { _id,sport} = activites;
          return (
            <Picker.Item
              key={_id} 
              containerStyle={[styles.listItem, {backgroundColor:'#C6FFCC'}]}
              //title={sport} 
              //titleStyle={styles.text}
              value = {sport}
              label = {sport}
            />
        )})}
       </Picker>
    );
};

export default SportList;
