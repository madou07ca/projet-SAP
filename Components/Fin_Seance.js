import React, { Component } from "react";

import { View, Text,Picker,StyleSheet,TouchableHighlight} from "react-native";



//Requete d'interaction avec le serveur

import Requests from './../Requests'
import RequestSport from './../RequestsSport'

import { TextInput, Switch } from "react-native-paper";

//import SwitchToggle from "react-native-switch-toggle";


class Fin_Seance extends Component {

  static navigationOptions = {

    title: "Fin de Séance",

    headerTintColor: '#ffffff',

    headerStyle: {

      backgroundColor: 'green',

    },

  };



  constructor(props) {

    super(props);

    this.state = {

        id: "",

        sport: this.props.navigation.state.params.itemSport,

        douleurAvant: this.props.navigation.state.params.itemDouleurAvant,

        zoneDouleurAvant: this.props.navigation.state.params.itemZoneDouleurAvant,

        douleurApres: "",

        zoneDouleurApres: "",

        nbKilometre: "",

        duree : this.props.navigation.state.params.itemChrono,

        sportExisteDeja : false,

        tabSport : [],

        name : this.props.navigation.state.params.itemSport

        //duree:"100",

        //switchOn2: false

    };

  }

  componentDidMount(){
    //Requete sport
    const getInfoJSON = RequestSport.getRequest();
    getInfoJSON.then(respJson => {
      //set array state sport
      this.setState({tabSport: respJson.reverse()});
      /* this.state.tabSport.forEach(function(element) {
        if(element.name === this.state.sport){
          this.setState.sportExisteDeja = true
        }
    }) */
    }).catch(err => console.log(err));

  }


  //Cette méthode sera appelée lorsque l'utilisateur décidera d'appuyer sur le bouton d'envoi

  // Il va vérifier si tous les champs sont remplis

  checkFields = () => {

    const {sport, douleurAvant, douleurApres,zoneDouleurAvant, zoneDouleurApres, nbKilometre, duree} = this.state;

    let message = "";

    if(sport === ''){

    message += "Sport ";

    }

    if(douleurAvant === ''){ 

    message += "Douleur Avant ";

    }

    if(douleurApres === ''){ 

    message += "Douleur Apres ";

    }

    if(zoneDouleurAvant === ''){ 

      message += "Zone Avant ";

    }

    if(zoneDouleurApres === ''){ 

      message += "Zone Apres ";

    }

    if(nbKilometre === ''){ 

      message += "Nombre Km ";

    }

    if(duree === ''){ 

      message += "Duree ";

    }

    return message;

  }


  submitSport = () => {
    let request;
    const {id,name} = this.state; //ajouter nbrKm et duree

    const submittedSport = {name};
    RequestSport.postRequest(submittedSport);
    console.log(name);

  }


  //Cette méthode sera appelée lorsque l'utilisateur décidera d'appuyer sur le bouton d'envoi

  // Il va vérifier si tous les champs sont remplis

  submitActivites = () => {

    // state

    const {id, sport, douleurAvant, douleurApres, zoneDouleurAvant, zoneDouleurApres, nbKilometre, duree} = this.state; //ajouter nbrKm et duree

    const submittedActivites = {sport, douleurAvant, douleurApres, zoneDouleurAvant, zoneDouleurApres, nbKilometre, duree}; //ajouter nbrKm et duree


    //Vérification

     const error = this.checkFields();

    //S'il y a des champs vides

    if(error !== ''){

      //Envoyé un message d'erreur

      errorMessage = `Veuillez remplir les champs suivant: \n ${error}`;

      //ToastAndroid.show(errorMessage, ToastAndroid.SHORT);

      console.log(errorMessage)

      return;

    } 

    //Sinon, faites la requete

    let request;

    //Si id est vide, nous ajoutons une nouvelle activité.

    if(id === '' || id === undefined){
      //if (this.state.sportExisteDeja){
        this.submitSport();
       
        request = Requests.postRequest(submittedActivites);
     // } else{
       // request = Requests.postRequest(submittedActivites);
     // }
    //Sinon, nous mettons à jour une activité

    } else{

      // plutard

      request = Requests.putRequest(id, submittedActivites);

    }

    //revenir sur l'écran d'accueil

    this.props.navigation.navigate('Accueil');

    console.log(sport, douleurAvant, douleurApres, zoneDouleurAvant, zoneDouleurApres, nbKilometre, duree)

  }

  onPress2 = () => {

    this.setState({ switchOn2: !this.state.switchOn2 });

    this.showDialog(true);

  };

  ShowHideTextComponentView() {

    isDialogVisible = true;

  }

  showDialog(isShow) {

    this.setState({ isDialogVisible: isShow });

  }

  sendInput(inputText) {

    console.log("sendInput (DialogInput#1): " + inputText);

  }



  render() {

    return (

      <View style={styles.container}>

        <View style={styles.list}>

          <Text style={styles.textTitre}>Nombre de KM ou Durée</Text>
{/* 
          <SwitchToggle containerStyle={{

            marginTop: 16,

            marginBottom: 16,

            width: 60,

            height: 30,

            borderRadius: 25,

            backgroundColor: "#ccc",

            padding: 5

          }}circleStyle={{

            width: 18,

            height: 18,

            borderRadius: 8,

            backgroundColor: "green" // rgb(102,134,205)

          }}switchOn={this.state.switchOn2} onPress={this.onPress2} circleColorOff="grey" circleColorOn="green" duration={300}

          /> */}

          <TextInput isDialogVisible={this.state.isDialogVisible} //

            keyboardType="numeric" maxLength={10} placeholder="Entrez le nombre de Km parcourus" selectedValue={this.state.nbKilometre} onChangeText={(itemValue, itemIndex) =>

              this.setState({ nbKilometre: itemValue })

            }/>

        </View>

        <View style={styles.list}>

          <Text style={styles.textTitre}>Zone de douleur après sport</Text>

          <TextInput placeholder="Entrez la zone de apres" selectedValue={this.state.zoneDouleurApres} onChangeText={(itemValue, itemIndex) =>

            this.setState({ zoneDouleurApres: itemValue })

          }/>

        </View>

        <View style={styles.list}>

          <Text style={styles.textTitre}>Niveau de douleur apres sport</Text>

          <Picker style={styles.picker} selectedValue={this.state.douleurApres} onValueChange={(itemValue, itemIndex) => this.setState({ douleurApres: itemValue })}>

            <Picker.Item label="0" value="0" />

            <Picker.Item label="1" value="1" />

            <Picker.Item label="2" value="2" />

            <Picker.Item label="3" value="3" />

            <Picker.Item label="4" value="4" />

            <Picker.Item label="5" value="5" />

            <Picker.Item label="6" value="6" />

            <Picker.Item label="7" value="7" />

            <Picker.Item label="8" value="8" />

            <Picker.Item label="9" value="9" />

            <Picker.Item label="10" value="10" />

          </Picker>

          <TouchableHighlight style={styles.buttonsubmit} onPress={() => this.submitActivites()} underlayColor="white">

            <View>

              <Text style={styles.buttonText}>Enregistrer</Text>

            </View>

          </TouchableHighlight>  

        </View>

        

      </View>

    );

  }

}

export default Fin_Seance;



const styles = StyleSheet.create({

  container: {

    flex: 1

  },

  list: {

    flex: 1,

    //backgroundColor: "#2196F3",

    borderWidth: 0.5

  },

  textTitre: {

    color: "black",

    padding: 10,

    textAlign: "center",

    fontSize: 20,

  },

  picker: {

    width: 100,

    alignSelf: "center",

    color:"green",

  },

  buttonplus: {

    backgroundColor: "white",

    borderRadius: 4,

    marginTop: 5,

    marginBottom: 10,

    marginLeft: 10,

    marginRight: 10,

    padding: 5,

    position: "absolute",

    right: 0

  },

  buttonText: {

    color:"white"

  },

  buttonsubmit: {

    backgroundColor: "green",

    borderRadius: 4,

    marginTop: 5,

    marginBottom: 10,

    marginLeft: 10,

    marginRight: 10,

    padding: 5,

    position: "absolute",

    bottom: 0,

    right:0

  }

});