import React from 'react'
import { Alert, StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native'
import PureChart from 'react-native-pure-chart';

import Requests from './../Requests'
let tab = [];
let tab2 = [];
class Accueil extends React.Component {
  static navigationOptions = {

    title: "Accueil",

    headerLeft: null,

    headerTintColor: '#ffffff',

    headerStyle: {

      backgroundColor: 'green',

    },

  }

    constructor(props) {

        super(props);
    
        this.state = {
 
    
          //activite: ["India","Pakistan","USA"],
          activite : [],
          tab : [],
    
        };
    
      }

    _onPressButton(){
        Alert.alert('touch'),
        console.log("touch")
    }

    _displaySeance(){
        this.props.navigation.navigate('Seance')
    }
    _displayConsulter(){
        this.props.navigation.navigate('Consulter')
    }

    _displayEstimer() {

        this.props.navigation.navigate('estimerDouleur');
    
      }

      componentDidMount(){
        //Requete activite
        const getInfoJSON = Requests.getRequest();
        getInfoJSON.then(respJson => {
          //set state activite
          this.setState({activite: respJson.reverse()});
          this.setState({tab : this.traitement()});
        console.log("tab", this.state.tab);
        }).catch(err => console.log(err)); 
      tab2 = this.grapheDouleurApres();
      }
      grapheDouleurAvant(){
        let act = [];
        this.state.activite.forEach((t) =>{
          act.push({x :t['date'], y : t['douleurAvant']*1})
        })
        console.log("douleur avant" +act);
        return act;
      }

      grapheDouleurApres(){
        let act = [];
        this.state.activite.forEach((t) =>{
          act.push({x :t['date'], y : t['douleurApres']*1})
        })
        return act;
      }
      traitement(){
        let act= [];
        this.state.activite.forEach((t) =>{
          act.push({x :t['date']})
        })
        console.log ("act", act)
        return act;
      }
    render(){
      console.log("Courbe 1", this.grapheDouleurAvant());
      console.log("Courbe 2", this.grapheDouleurApres());
      console.log("tab", this.state.tab);
     // tab2 = this.grapheDouleurApres();
      /*  let sampleData = [
             {
              seriesName: 'series1',
              data: [this.state.tab],
              color: '#297AB1'
            },
            {
              seriesName: 'series2',
              data : [tab2], 
              color: 'yellow'
            } 
        
             
        ];
        console.log("sampledata",sampleData);*/

        let sampleData = [
           {
            seriesName: 'series1',
            data: [
              {x: '2018-02-01', y: 20},
              {x: '2018-02-02', y: 100},
              {x: '2018-02-03', y: 140},
              {x: '2018/02/04', y: 550},
              {x: '2018-02-05', y: 40}
            ],
            color: '#297AB1'
          },
          {
            seriesName: 'series2',
             data: [
              {x: '2018-02-01', y: 20},
              {x: '2018-02-02', y: 100},
              {x: '2018-02-03', y: 140},
              {x: '2018/02/04', y: 550},
              {x: '2018-02-05', y: 40}
            ], 
            color: 'yellow'
          } 
      
           
      ];
        return (
            <View style={styles.main_container}>

            <TouchableHighlight
    
              style={styles.button}
    
              onPress={() => this._displaySeance()}
    
              underlayColor="white"
    
            >
    
              <View style={styles.TouchView}>
    
                <Text style={styles.text}>Lancer ma Séance</Text>
    
                <Image
    
                  style={styles.image}
    
                  source={require("./../images/play.png")}
    
                />
    
              </View>
    
            </TouchableHighlight>
    
    
    
            <TouchableHighlight
    
              style={styles.button}
    
              onPress={() => this._displayConsulter()}
    
              underlayColor="white"
    
            >
    
              <View style={styles.TouchView}>
    
                <Text style={styles.text}>Consulter mon Activité</Text>
    
                <Image
    
                  style={styles.image}
    
                  Text={"cs"}
    
                  source={require("./../images/chrono.jpg")}
    
                />
    
              </View>
    
            </TouchableHighlight>
    
            <TouchableHighlight
    
              style={styles.button}
    
              onPress={() => this._displayEstimer()}
    
              underlayColor="white">
    
              <View style={styles.TouchView}>
    
              <Text style={styles.text}>Estimer ma Douleur</Text>
    
                <Image
    
                  style={styles.image}
    
                  source={require("../images/douleur.jpg")}
    
                />
    
              </View>
    
            </TouchableHighlight>
    
    
    
            <TouchableHighlight
    
              style={styles.button}
    
              //onPress={() => this._displayEstimer()}
    
              underlayColor="white"
    
            >
    
              <View style={styles.graph}>
    
                <PureChart data={sampleData} type="line" />
    
              </View>
    
            </TouchableHighlight>
    
          </View>
    
        );
    
      }
    
    }
    
    
    
    const styles = StyleSheet.create({
    
      main_container: {
    
        flex: 1,
    
        
    
        //marginBottom: 10,
    
      },
    
      menuBar: {
    
        flex: 0.4,
    
        backgroundColor: "gray"
    
      },
    
      button: {
    
        flex: 1,
    
        backgroundColor: "white", //'#2196F3',
    
        justifyContent: "center",
    
        alignItems: "center",
    
        borderTopColor: "black",
    
        borderTopWidth: 2,
    
      },
    
      TouchView: {
    
        
    
        resizeMode: "cover",
    
        alignItems: "center",
    
        justifyContent: "center",
    
      },
    
      image: {
    
        width: 110, //220,
    
        height: 110, //220,
    
        resizeMode: "cover",
    
        alignItems: "center",
    
        justifyContent: "center",
    
      },
    
      text: {
    
        padding: 2,
    
        color: "black",
    
        fontSize: 20,
    
      },
    
      graph: {
    
        flex: 1,
    
        backgroundColor: "white",
    
       // padding: 5
    
      }
    
    });
export default Accueil