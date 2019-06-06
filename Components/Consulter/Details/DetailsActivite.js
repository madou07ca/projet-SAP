import React, {Component} from 'react';
import { StyleSheet, View, Switch, TextInput, ToastAndroid, ScrollView } from 'react-native';

//Components
import FieldContainer from './FieldContainer';
import ActionButton from './ActionButton';
//requete
import Requests from '../../../Requests';

//Styles
const styles = StyleSheet.create({
  globalStyle: {
    fontSize: 16
  },
  label: {
    flex: 1,
    textAlign: "right"
  },
  textInput: {
    flex: 3,
    borderRadius: 5,
    borderWidth: 1,
    textAlignVertical: "top",
    padding: 10
  },
  switchComp: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}]
  }
});

class DetailsActivite extends Component{

	constructor(props){
		super(props);
		this.state = {
			id: '', 
			sport: '', 
			douleurAvant: '',
			douleurApres: '', 
      zoneDouleurAvant: '',
      zoneDouleurApres: "",
      nbKilometre: "",
      duree : '',
      date : "",
      heure : ""
		};
	}

	static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam("title"), 
      headerStyle: {
        backgroundColor: '#green'
      },
      headerTintColor: '#fff'
    };
  }

  componentDidMount(){
    //Get Activites
  	const { navigation } = this.props;
  	const activite = navigation.getParam("activites");
  		const {_id, sport, douleurAvant, douleurApres, zoneDouleurAvant,zoneDouleurApres,nbKilometre,duree,date,heure} = activite;
  		this.setState({id: _id, sport, douleurAvant, douleurApres, zoneDouleurAvant,zoneDouleurApres,nbKilometre,duree,date,heure});
  }

  updateActivite = () => {
    //Deconstruct state
    const {id, sport, douleurAvant, douleurApres, zoneDouleurAvant,zoneDouleurApres,nbKilometre,duree,date,heure} = this.state;
    const submittedActivite = {sport, douleurAvant, douleurApres, zoneDouleurAvant,zoneDouleurApres,nbKilometre,duree,date,heure};
    let request;
      request = Requests.putRequest(id, submittedActivite);
    this.props.navigation.navigate("Accueil");
  }

  deleteActivite = () => {
    //Deconstruct state
    const {id, sport, douleurAvant, douleurApres, zoneDouleurAvant,zoneDouleurApres,nbKilometre,duree,date,heure} = this.state;
    const activite = {sport, douleurAvant, douleurApres, zoneDouleurAvant,zoneDouleurApres,nbKilometre,duree,date,heure };
    let request = Requests.deleteRequest(id);
    this._requestUpdate(request);
    this.props.navigation.navigate("Accueil");
  }

  _requestUpdate = (request) => {
    request.then(jsonResponse => {
      //Request
      const getRequest = Requests.getRequest();
      getRequest.then(respJson => {
        //Update state
        this.setState({activite: respJson.reverse()});
      }).then(() => {
      }).catch(err => console.log(err));
    }).catch(err => console.log(err)); 
  }

	render(){
    //Deconstruct state
		const {id, sport, douleurAvant, douleurApres, zoneDouleurAvant,zoneDouleurApres,nbKilometre,duree,date,heure} = this.state;
		return(
			<ScrollView style={{padding:0}}>

        <FieldContainer title="Sport:">
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={sport} 
            onChangeText={sport => this.setState({sport})}
            placeholder="Sport..."
          />
        </FieldContainer>

        <FieldContainer title="DouleurAvant:">
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={douleurAvant} 
            onChangeText={douleurAvant => this.setState({douleurAvant})}
            placeholder="Niveau Douleur Avant..."
          />
        </FieldContainer>

        <FieldContainer title="Douleur Apres:">
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={douleurApres} 
            onChangeText={douleurApres => this.setState({douleurApres})} 
            placeholder="Niveau Douleur Après..."
          />
        </FieldContainer>

        <FieldContainer title="Zone Avant:">
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={zoneDouleurAvant} 
            onChangeText={zoneDouleurAvant => this.setState({zoneDouleurAvant})} 
            placeholder="Zone Douleur Avant..."
            multiline={true} 
            numberOfLines={5}
          />
        </FieldContainer>

        <FieldContainer title="Zone Apres:">
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={zoneDouleurApres} 
            onChangeText={zoneDouleurApres => this.setState({zoneDouleurApres})} 
            placeholder="Zone Douleur Apres..."
            multiline={true} 
            numberOfLines={5}
          />
        </FieldContainer>

        <FieldContainer title="Kilometre:">
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={nbKilometre} 
            onChangeText={nbKilometre => this.setState({nbKilometre})} 
            placeholder="nb Kilometre..."
          />
        </FieldContainer>

        <FieldContainer title="Durée:">
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={duree} 
            onChangeText={duree => this.setState({duree})} 
            placeholder="Durée..."
          />
        </FieldContainer>

        <FieldContainer title="Date:">
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={date} 
            onChangeText={date => this.setState({date})} 
            placeholder="Date..."
          />
        </FieldContainer>

        <FieldContainer title="Heure:">
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={heure} 
            onChangeText={heure => this.setState({heure})} 
            placeholder="Heure..."
          />
        </FieldContainer>

				<FieldContainer>
          <ActionButton color={{backgroundColor: "#EF233C"}} title="Delete" onPressAction={this.deleteActivite}/>
          <ActionButton color={{backgroundColor: "#58B759"}} title="Update" onPressAction={this.updateActivite}/>
        </FieldContainer>

			</ScrollView>
		);
	}

}

export default DetailsActivite;