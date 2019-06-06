import React from "react";

import { StyleSheet, Text, View, TouchableHighlight } from "react-native";



class EstimerDouleur extends React.Component {

  static navigationOptions = {

    title: "Estimer ma douleur",

    headerTintColor: '#ffffff',

    headerStyle: {

      backgroundColor: 'green',

    },

  };



  render() {

    return (

      <View style={styles.container}>

      <Text style={styles.textIntro}>Au cours d'une séance, un niveau de douleur est demandé avant et après l'exercice, pour cela on peut l'estimer sur une  échelle de 0 à 10.</Text>

        <View >

          <Text style={styles.text}>de 0 à 1 : simple inconfort</Text>

          <Text style={styles.text}>de 1 à 3 : douleur légère</Text>

          <Text style={styles.text}>de 3 à 5 : douleur modérée</Text>

          <Text style={styles.text}>de 5 à 7 : douleur intense</Text>

          <Text style={styles.text}>de 7 à 10 : douleur très intense</Text>

        </View>

      </View>

    );

  }

}

export default EstimerDouleur;



const styles = StyleSheet.create({

  container: {

    flex: 1,

  },

  textIntro: {

    textAlign: "center",

    marginTop: 25,

    fontSize:14,

  },

  text: {

    textAlign: "center",

    marginTop: 30,

    fontSize:20,

  }

});