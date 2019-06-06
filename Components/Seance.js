
import React, { Component } from "react";

import {View,Text,Picker,StyleSheet,TouchableHighlight} from "react-native";

import DialogInput from "react-native-dialog-input";
import ListSport from './pickerSport';



//Requete d'interaction avec le serveur

import Requests from './../RequestsSport'

import { TextInput } from "react-native-paper";


//let tabSportFiltre = []
class Seance extends Component {

  static navigationOptions = {

    title: "Lancer ma Séance",

    headerTintColor: '#ffffff',

    headerStyle: {

      backgroundColor: 'green',

    },

  };



  constructor(props) {

    super(props);

    this.state = {

      id: "",

      sport: "",

      douleurAvant: "",

      zoneDouleurAvant: "",

      isDialogVisible: false, 
      tabSport : [],
      tabSportFiltre : [],
      texte : "",
      show : "Entrer le sport"

      //Ajouter les autres champs

    };

  }


    componentDidMount(){
    //Requete sport
    const getInfoJSON = Requests.getRequest();
    getInfoJSON.then(respJson => {
      //set state sport
      this.setState({tabSport: respJson.reverse()});
     /* this.state.tabSport.forEach(function(element) {
        tabSportFiltre.push(element.name);
    })
      tabSportFiltre = [...new Set(tabSportFiltre)];*/
      this.setState({tabSportFiltre : this.traitement()})
      //this.setState.tabSportFiltre = this.traitement();
    }).catch(err => console.log(err));

  }  
 traitement= ()=>{
   let act = [];
  this.state.tabSport.forEach(function(element) {
    act.push(element.name);
})
 return act = [...new Set(act)];
 }



  //Cette méthode sera appelée lorsque l'utilisateur décidera d'appuyer sur le bouton d'envoi

  // Il va vérifier si tous les champs sont remplis

  checkFields = () => {

    const { sport, douleurAvant, zoneDouleurAvant } = this.state;

    let message = "";

    if (sport === "") {

      message += "Sport ";

    }

    if (douleurAvant === "") {

      message += "Douleur Avant ";

    }

    if (zoneAvant === "") {

      message += "ZoneAvant";

    }

    return message;

  };

  _requestUpdate = (request) => {
    request.then(jsonResponse => {
      //Request
      const getRequest = Requests.getRequest();
      getRequest.then(respJson => {
        //Update state
        this.setState({tabSport: respJson.reverse()});
      }).then(() => {
      }).catch(err => console.log(err)); //Catch any error and print it into the console
    }).catch(err => console.log(err)); //Catch any error and print it into the console
  }

  submitsports = () => {

    // state

    const { id, sport, douleurAvant, zoneAvant } = this.state;

    const submittedsports = { sport, douleurAvant, zoneDouleurAvant };

    //Vérification

    const error = this.checkFields();

    //S'il y a des champs vides

    if (error !== "") {

      //Envoyé un message d'erreur

      errorMessage = `Veuillez remplir les champs suivant: \n ${error}`;

      //ToastAndroid.show(errorMessage, ToastAndroid.SHORT);

      console.log(errorMessage);

      return;

    }

    //Sinon, faites la requete

    let request;

    //Si id est vide, nous ajoutons une nouvelle activité.

    if (id === "" || id === undefined) {

      request = Requests.postRequest(submittedsports);

      alert("Ajouté");

      //Sinon, nous mettons à jour une activité

    } else {

      // plutard

      request = Requests.putRequest(id, submittedsports);

    }



    //revenir sur l'écran d'accueil

    this.props.navigation.navigate("Home");

  };



  _displayFinSeance() {
   this.traitement();
    this.props.navigation.navigate("Chrono", {itemSport: this.state.sport, itemDouleurAvant: this.state.douleurAvant, itemZoneDouleurAvant: this.state.zoneDouleurAvant});

  }



  ShowHideTextComponentView() {

    isDialogVisible = true;

  }



  showDialog(isShow) {

    this.setState({ isDialogVisible: isShow });

  }

  sendInput(inputText) {

    console.log("sendInput (DialogInput#1): " + inputText);
     texte = inputText;

    //request = Requests.postRequest(inputText);
    this.state.sport = inputText;
    this.showSport(inputText)

  }
  showSport(inputText){
    this.state.show = inputText;
  }

 



  render() {

    return (

      <View style={styles.container}>

        <View style={styles.list}>

          <Text style={styles.textTitre}>Choisir un sport</Text>

          <TouchableHighlight

            style={styles.buttonplus}

            onPress={() => this.showDialog(true)}

            underlayColor="white">

            <View>

              <Text style={styles.buttonText}>+</Text>

            </View>

          </TouchableHighlight>



          <DialogInput

            isDialogVisible={this.state.isDialogVisible}

            title={"Nouveau sport"}

            message={"Entrez le nom du sport à ajouter"}

            hintInput={"nom du sport"}

            submitInput={inputText => {

              this.sendInput(inputText);

              this.showDialog(false);

            }}

            closeDialog={() => {

              this.showDialog(false);

            }}

          />

            <Picker
            selectedValue={this.state.sport}

            onValueChange={(itemValue, itemIndex) => this.setState({sport: itemValue})} >

            
              <Picker.Item label={this.state.show} value={this.state.sport} />
            { this.state.tabSportFiltre.map((item, key)=>(
              //<Picker.Item label={this.state.show} value={item.sport} key={key} />
            <Picker.Item label={item} value={item} key={key} />
            //<Picker.Item label={inputText} value={inputText} key={key} />
            )
            )}
    
          </Picker>
              

            

          

           {/*  <Picker.Item label="Course" value="Course" />

            <Picker.Item label="Marche" value="Marche" />

          <Picker.Item label="Natation" value="Natation" />
          <Picker.Item label="hello" value={this.state.sport} />

          </Picker> 
          }
           <Picker
                    selectedValue={this.state.sport}
                    onValueChange={ (value) => ( this.setState({sport : value}) )}>





                    { this.listes() }
                </Picker>

        </View> */}
        {/* <Picker> 
           <ListSport
                sport={sport} 
                //selected={selected} 
                //onShowModal={this.onShowModal}
              />

          </Picker> */}

        </View>

        <View style={styles.list}>

          <Text style={styles.textTitre}>Zone de douleur avant sport</Text>



          <TextInput placeholder="Entrez la zone de douleur"

          selectedValue={this.state.zoneDouleurAvant}

          onChangeText={(itemValue, itemIndex) =>

            this.setState({ zoneDouleurAvant: itemValue })

          } />









          </View>

          <View style={styles.list}>

          <Text style={styles.textTitre}>Niveau de douleur avant sport</Text>

          <Picker

            style={styles.picker}

            selectedValue={this.state.douleurAvant}

            onValueChange={(itemValue, itemIndex) =>

              this.setState({ douleurAvant: itemValue })

            }

          >

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

         <TouchableHighlight style={styles.buttonsubmit} onPress={() => this._displayFinSeance()} underlayColor="white">

            <View>

              <Text style={styles.buttonText}>Commencer</Text>

            </View>

          </TouchableHighlight>

        </View>

      </View>

    );

  }

}

export default Seance;



const styles = StyleSheet.create({

  container: {

    flex: 1

  },

  list: {

    flex: 1,

   // backgroundColor: "#2196F3",

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

  pickerSport: {

   // backgroundColor:'#E7E7E7'

  },



  

  buttonplus: {

    backgroundColor: "green",

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

  textInput:{

    

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