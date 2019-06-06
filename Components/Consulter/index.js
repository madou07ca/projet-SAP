import React, {Component} from 'react';
import { StyleSheet, ScrollView, ProgressBarAndroid, Dimensions, TouchableOpacity, Text, View, Modal } from 'react-native';

//Created components
import ListeActivites from './ActiviteList';
import LongPressModal from './LongPressModal';

//Requete
import Requests from './../../Requests';

//Obtenir des dimensions de l'écran
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

//Styles
const styles = StyleSheet.create({
 
});

class ConsulterActivites extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalShow: false, 
      selectedActivites: {},
      activite: [], //tableau d'activité
    };
  }

  static navigationOptions = ({navigation}) => {
    const requestUpdate = navigation.getParam("requestUpdate");
    return {
      title: 'Listes des Activités',
      headerTintColor: '#ffffff',

     headerStyle: {

      backgroundColor: 'green',

    },
    };
  }

  componentDidMount(){
    this.props.navigation.setParams({requestUpdate: this._requestUpdate});
    //Requete activite
    const getInfoJSON = Requests.getRequest();
    getInfoJSON.then(respJson => {
      //set state activite
      this.setState({activite: respJson.reverse()});
    }).catch(err => console.log(err));
  }

  //Cette méthode sera appelée lorsqu’une activité aura eu une longue interaction avec la presse.
  //l'état modalShow passera à true montrant le modal
  onShowModal = (activites) => {
    this.setState({
      modalShow: !this.state.modalShow,
      selectedActivites: activites
    });
  }

  //Cela changera l'état de modalShow en false (Masquage du modal)
  onHideModal = () => {
    this.setState({modalShow: !this.state.modalShow});
  }
 

   /*updateIndex = (selected) => {
    this.setState({selected});
  } */

 
  // Cette méthode sera appelée lorsque l'utilisateur appuiera sur le bouton Supprimer du bouton Modal.
  // Il supprimera l'activité sélectionnée
  onDeleteActivites = (id) => {
    //Requete serveur pour supprimer une activité
    const deleteRequest = Requests.deleteRequest(id);
    //Update Activité state
    this._requestUpdate(deleteRequest);
    //Hide modal
    this.onHideModal();
  }

  _requestUpdate = (request) => {
    //Any kind of request done to the server
    request.then(jsonResponse => {
      //Request
      const getRequest = Requests.getRequest();
      getRequest.then(respJson => {
        //Update state
        this.setState({activite: respJson.reverse()});
      }).then(() => {
      }).catch(err => console.log(err)); //Catch any error and print it into the console
    }).catch(err => console.log(err)); //Catch any error and print it into the console
  }

  render() {
    //states
    const { modalShow, activite,selected, selectedActivites } = this.state;
    //navigation props (React Navigation)
    const { navigation } = this.props;
    return (
      <View>
        <LongPressModal 
          modalShow={modalShow} 
          onHideModal={this.onHideModal}
          selectedActivites={selectedActivites}
          onDeleteActivites={this.onDeleteActivites}
        />  

        <ScrollView>
          
              <ListeActivites
                activite={activite} 
                navigation = {navigation}
                selected={selected} 
                onShowModal={this.onShowModal}
              />
        </ScrollView>
      </View>
      
    );
  }
}

export default ConsulterActivites;