import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import { List, ListItem } from 'react-native-elements';

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

const ActiviteList = (props) => {
  // props
  let { activite, onShowModal, navigation} = props;
  return (
      <List containerStyle={styles.list}>
        {activite.map(activites => {
          const { _id,sport, douleurAvant, date, heure} = activites;
          return (
            <ListItem
            onPressRightIcon={() => navigation.navigate('DetailsActivite', {activites, title: "Details Activité", requestUpdate: navigation.getParam("requestUpdate")})} 
              onLongPress={() => onShowModal(activites)}
              key={_id} 
              containerStyle={[styles.listItem, {backgroundColor:'#C6FFCC'}]}
              rightIcon={{color: '#586F7C'}}
              title={sport} 
              titleStyle={styles.text}
              //subtitle={douleurAvant}
              subtitle = {date + " " + heure}
              //subtitle = 
              subtitleStyle={styles.text}
            />
        )})}
       </List>
    );
};

export default ActiviteList;
